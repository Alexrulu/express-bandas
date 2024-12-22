const express = require('express');
const router = express.Router();
const { bandas } = require('../db/index.js'); // Asegúrate de que la ruta sea correcta

// Ruta principal: muestra el listado de bandas
router.get('/', (req, res) => {
  res.json(bandas.lista);
});

// Ruta que recibe un id y muestra la banda con ese id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const banda = bandas.lista.find(b => b.id === id);
  if (banda) {
    res.json(banda);
  } else {
    res.status(404).json({ error: 'Banda no encontrada' });
  }
});

// Ruta que recibe un género y muestra las bandas de ese género
router.get('/genero/:genero', (req, res) => {
  const genero = req.params.genero.toLowerCase();
  const bandasPorGenero = bandas.lista.filter(b => b.genero.toLowerCase() === genero);
  if (bandasPorGenero.length > 0) {
    res.json(bandasPorGenero);
  } else {
    res.status(404).json({ error: 'No se encontraron bandas para el género especificado' });
  }
});

module.exports = router;
