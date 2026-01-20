const { getDataloggerData } = require('../../models/administracion/dataloggerModel');
const { Parser } = require('json2csv');

const obtenerDatosPorMes = async (req, res) => {
  /*try {
    const { mes, desde, hasta, esta_id } = req.query;

    if (!mes || !desde || !hasta) {
      return res.status(400).json({ error: 'Se requieren los parámetros mes, desde y hasta' });
    }

    const datos = await getDataloggerData(
      Number(mes),
      desde,
      hasta,
      esta_id ? Number(esta_id) : null
    );

    res.json(datos);
  } catch (error) {
    console.error("Error al obtener datos del datalogger:", error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }*/
 try {
    const { mes, desde, hasta, esta_id, descargar } = req.query;

    if (!mes || !desde || !hasta) {
      return res.status(400).json({ error: 'Se requieren los parámetros mes, desde y hasta' });
    }

    const datos = await getDataloggerData(
      Number(mes),
      desde,
      hasta,
      esta_id ? Number(esta_id) : null
    );

    if (descargar === 'true') {
      // Si el usuario quiere descargar, convierte a CSV
      const parser = new Parser();
      const csv = parser.parse(datos);

      res.header('Content-Type', 'text/csv');
      res.attachment(`datalogger_mes${mes}_${desde}_a_${hasta}.csv`);
      return res.send(csv);
    }

    // Si no quiere descargar, solo retorna JSON
    res.json(datos);
  } catch (error) {
    console.error("Error al obtener datos del datalogger:", error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }

};

module.exports = { obtenerDatosPorMes };
