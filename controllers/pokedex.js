const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=[ 'Pokedex' ]
    const result = await mongodb.getDatabase().db().collection('pokedex').find();
    result.toArray().then((pokedex) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(pokedex);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=[ 'Pokedex' ]
    const pokedexId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('pokedex').find({ _id: pokedexId });
    result.toArray().then((pokedex) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(pokedex[0]);
    });
};

const createPokemon = async (req, res) => {
    //#swagger.tags=[ 'Pokedex' ]
    const pokedex = {
        pokemon: req.body.pokemon,
        type: req.body.type,
        position: req.body.position
    };
    const response = await mongodb.getDatabase().db().collection('pokedex').insertOne(pokedex);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the pokemon.');
    }
};

const updatePokemon = async (req, res) => {
    //#swagger.tags=[ 'Pokedex' ]
    const pokedexId = new ObjectId(req.params.id);
    const pokedex = {
        pokemon: req.body.pokemon,
        type: req.body.type,
        position: req.body.position
    };
    const response = await mongodb.getDatabase().db().collection('pokedex').replaceOne({ _id: pokedexId }, pokedex);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the pokemon.');
    }
};

const deletePokemon = async (req, res) => {
    //#swagger.tags=[ 'Pokedex' ]
    const pokedexId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('pokedex').deleteOne({ _id: pokedexId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while deleting the pokemon.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createPokemon,
    updatePokemon,
    deletePokemon
};