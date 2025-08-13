const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresaController');
const ctrl = require('../controllers/empresaController');


router.post('/', ctrl.cadastrarEmpresa);
router.get('/', ctrl.listarEmpresas);
router.get('/:id', ctrl.obterEmpresa);
router.put('/:id', ctrl.atualizarEmpresa);
router.delete('/:id', ctrl.removerEmpresa);

module.exports = router;
