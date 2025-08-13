const express = require('express');
const router = express.Router();
const produtorController = require('../controllers/produtorController');

router.post('/', produtorController.cadastrarProdutor);
router.post('/atribuir', produtorController.atribuirProdutor);
router.put('/transferir', produtorController.transferirProdutor);

module.exports = router;
