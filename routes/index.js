const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => { res.send('Hello Pokemon World');});

router.use('/pokedex', require('./pokedex'));

module.exports = router;