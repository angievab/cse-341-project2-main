//const express = require('express');
const router = require('express').Router();

const pokedexController = require('../controllers/pokedex');

const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', pokedexController.getAll);
router.get('/:id', pokedexController.getSingle);
router.post('/', isAuthenticated, pokedexController.createPokemon);
router.put('/:id', isAuthenticated, pokedexController.updatePokemon);
router.delete('/:id', isAuthenticated, pokedexController.deletePokemon);

module.exports = router;