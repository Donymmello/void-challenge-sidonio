const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/campanhaController');

router.post('/', ctrl.cadastrarCampanha);
router.get('/', ctrl.listarCampanhas);
router.get('/:id', ctrl.obterCampanha);
router.put('/:id', ctrl.atualizarCampanha);
router.delete('/:id', ctrl.removerCampanha);

module.exports = router;
