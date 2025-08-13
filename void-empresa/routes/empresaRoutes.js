const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresaController');

router.post('/', empresaController.cadastrarEmpresa);

module.exports = router;
