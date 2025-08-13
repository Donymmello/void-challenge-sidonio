const express = require('express');
const router = express.Router();
const campanhaController = require('../controllers/campanhaController');

router.post('/', campanhaController.cadastrarCampanha);

module.exports = router;
