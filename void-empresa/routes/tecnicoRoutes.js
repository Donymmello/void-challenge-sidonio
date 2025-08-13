const express = require('express');
const router = express.Router();
const tecnicoController = require('../controllers/tecnicoController');

router.post('/', tecnicoController.cadastrarTecnico);
router.get('/:id/produtores', tecnicoController.listarProdutoresPorTecnico);

module.exports = router;
