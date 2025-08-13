const { body, validationResult } = require('express-validator');
const Produtor = require('../models/Produtor');
const ProdutorCampanha = require('../models/ProdutorCampanha');

exports.cadastrarProdutor = [
    body('nome').notEmpty().withMessage('Nome é obrigatório'),
    body('localizacao').notEmpty().withMessage('Localização é obrigatória'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const produtor = await Produtor.create(req.body);
            res.status(201).json(produtor);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
];

exports.atribuirProdutor = [
    body('produtor_id').notEmpty(),
    body('tecnico_id').notEmpty(),
    body('campanha_id').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const pc = await ProdutorCampanha.create(req.body);
            res.json({ message: 'Produtor atribuído com sucesso', data: pc });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
];

exports.transferirProdutor = [
    body('produtor_id').notEmpty(),
    body('tecnico_antigo_id').notEmpty(),
    body('tecnico_novo_id').notEmpty(),
    body('campanha_id').notEmpty(),

    async (req, res) => {
        console.log('Recebendo requisição PUT /produtores/transferir:', req.body);

        const errors = validationResult(req);
        if (!errors.isEmpty()) { 
            console.log('Erros de validação:', errors.array());                       
             return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { produtor_id, tecnico_antigo_id, tecnico_novo_id, campanha_id } = req.body;
            console.log('Dados recebidos:', { produtor_id, tecnico_antigo_id, tecnico_novo_id, campanha_id });
            const pc = await ProdutorCampanha.findOne({ where: { produtor_id, tecnico_id: tecnico_antigo_id, campanha_id } });
            if (!pc) return res.status(404).json({ error: 'Relacionamento não encontrado' });

            pc.tecnico_id = tecnico_novo_id;
            pc.data_transferencia = new Date();
            await pc.save();

            res.json({ message: 'Produtor transferido com sucesso', data: pc });
        } catch (err) {
            console.error('Erro ao transferir produtor:', err);
            // Verifica se é erro de relacionamento não encontrado
            if (err.name === 'SequelizeForeignKeyConstraintError') {
                return res.status(400).json({ error: 'Relacionamento inválido' });
            }
            res.status(500).json({ error: err.message });
        }
    }
];