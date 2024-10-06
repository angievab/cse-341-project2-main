const express = require('express');
const router = require('express').Router();

const pokedexController = require('../controllers/pokedex');

router.get('/', pokedexController.getAll);

router.get('/:id', pokedexController.getSingle);

router.post('/', pokedexController.createPokemon);

router.put('/:id', pokedexController.updatePokemon);

router.delete('/:id', pokedexController.deletePokemon);

module.exports = router;