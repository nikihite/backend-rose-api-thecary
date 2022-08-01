const { Router } = require('express');
const { Character } =  require('../models/Character');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const character = await Character.getAll();
    res.json(data);
  });
