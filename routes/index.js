const router = require('express').Router();

router.get('/', (req, res) => { res.send('Hello Pokemon World');});

module.exports = router;