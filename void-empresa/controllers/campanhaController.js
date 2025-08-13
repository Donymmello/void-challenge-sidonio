const { body, validationResult } = require('express-validator');
const Campanha = require('../models/Campanha');

exports.cadastrarCampanha = [
    body('nome').notEmpty().withMessage('Nome é obrigatório'),
    body('empresa_id').notEmpty().withMessage('empresa_id é obrigatório'),
    body('data_inicio').notEmpty().withMessage('data_inicio é obrigatória'),

    async (req, res) => {
        console.log('Recebendo requisição POST /empresas:', req.body);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Erros de validação:', errors.array());
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const campanha = await Campanha.create(req.body);
            console.log('Campanha criada com sucesso:', campanha.toJSON());
            res.status(201).json(campanha);
        } catch (err) {
            console.error('Erro ao criar campanha:', err);
            // Verifica se é erro de nome duplicado
            if (err.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ error: 'Nome da campanha já cadastrado' });
            }
            res.status(500).json({ error: err.message });
        }
    }
];
