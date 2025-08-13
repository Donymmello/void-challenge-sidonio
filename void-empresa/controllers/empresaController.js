const { body, validationResult } = require('express-validator');
const Empresa = require('../models/Empresa');

exports.cadastrarEmpresa = [
    // Validação dos campos
    body('nome').notEmpty().withMessage('Nome é obrigatório'),
    body('cnpj').notEmpty().withMessage('CNPJ é obrigatório'),
    body('telefone').notEmpty().withMessage('Telefone é obrigatório'),
    body('email').notEmpty().withMessage('Email é obrigatório'),
    
    async (req, res) => {
        console.log('Recebendo requisição POST /empresas:', req.body);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Erros de validação:', errors.array());
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const empresa = await Empresa.create(req.body);
            console.log('Empresa criada com sucesso:', empresa.toJSON());
            res.status(201).json(empresa);
        } catch (err) {
            console.error('Erro ao criar empresa:', err);
            // Verifica se é erro de CNPJ duplicado
            if (err.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ error: 'CNPJ já cadastrado' });
            }
            res.status(500).json({ error: err.message });
        }
    }
];
