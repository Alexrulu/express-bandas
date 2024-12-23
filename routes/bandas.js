const express = require('express');
const router = express.Router();
const { bandas } = require('../db/index.js'); // Importar las bandas

// Ruta principal: listado de bandas
router.get('/', (req, res) => {
  res.render('listadoBandas', { bandas: bandas.lista });
});

// Ruta para el detalle de una banda por ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const banda = bandas.lista.find(b => b.id === id);

  if (banda) {
    res.render('detalleBandas', { banda });
  } else {
    res.status(404).render('error', {
      message: 'Banda no encontrada',
      error: { status: 404, stack: '' },
    });
  }
});

// Ruta para bandas por género
router.get('/genero/:genero', (req, res) => {
  const genero = req.params.genero.toLowerCase();
  const bandasPorGenero = bandas.lista.filter(b => b.genero.toLowerCase() === genero);

  if (bandasPorGenero.length > 0) {
    res.render('listadoBandas', { bandas: bandasPorGenero });
  } else {
    res.status(404).render('error', {
      message: 'No se encontraron bandas para este género',
      error: { status: 404, stack: '' },
    });
  }
});

module.exports = router;
