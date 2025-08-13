const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/produtorController');

router.post('/', ctrl.cadastrarProdutor);
router.get('/', ctrl.listarProdutores);
router.get('/:id', ctrl.obterProdutor);
router.put('/:id', ctrl.atualizarProdutor);
router.delete('/:id', ctrl.removerProdutor);

router.post('/atribuir', ctrl.atribuirProdutor);
router.put('/transferir', ctrl.transferirProdutor);

module.exports = router;
