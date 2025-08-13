const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/tecnicoController');

router.post('/', ctrl.cadastrarTecnico);
router.get('/', ctrl.listarTecnicos);
router.get('/:id', ctrl.obterTecnico);
router.put('/:id', ctrl.atualizarTecnico);
router.delete('/:id', ctrl.removerTecnico);
router.get('/:id/produtores', ctrl.listarProdutoresPorTecnico);

module.exports = router;
