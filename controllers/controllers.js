// Importa la base de datos de bandas
const db = require('../db/bandas');

// Método para listar todas las bandas
exports.listadoBandas = (req, res) => {
    res.render('listadoBandas', { bandas: db });
};

// Método para mostrar detalles de una banda específica por ID
exports.detalleBanda = (req, res) => {
    const banda = db.bandas.lista.find(b => b.id === parseInt(req.params.id));
    if (banda) {
        res.render('detalleBanda', { banda });
    } else {
        res.status(404).send('Banda no encontrada');
    }
};

// Método para filtrar bandas por género
exports.porGenero = (req, res) => {
    const bandasPorGenero = db.filter(b => b.genero === req.params.genero);
    res.render('porGenero', { bandas: bandasPorGenero });
};