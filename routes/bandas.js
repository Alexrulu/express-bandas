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

// Ruta para mostrar bandas por género
router.get('/genero/:genero', (req, res) => {
  const genero = req.params.genero;
  const bandasPorGenero = bandas.lista.filter(banda => banda.genero.toLowerCase() === genero.toLowerCase());

  res.render('porGenero', {
      genero, // Pasamos el género
      bandas: { lista: bandasPorGenero } // Filtramos las bandas por género
  });
});

module.exports = router;
