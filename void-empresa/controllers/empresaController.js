const { body, validationResult, param } = require('express-validator');
const service = require('../services/empresaService');

exports.cadastrarEmpresa = [
    body('nome').notEmpty().withMessage('Nome é obrigatório'),
    body('cnpj').notEmpty().withMessage('CNPJ é obrigatório'),
    body('telefone').notEmpty().withMessage('Telefone é obrigatório'),
    body('email').notEmpty().withMessage('Email é obrigatório'),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const empresa = await service.create(req.body);
            res.status(201).json(empresa);
        } catch (err) { next(err); }
    }
];

exports.listarEmpresas = async (req, res, next) => {
    try {
        res.json(await service.findAll());
    } catch (err) { next(err); }
};

exports.obterEmpresa = [
    param('id').isInt().withMessage('ID inválido'),
    async (req, res, next) => {
        try {
            const empresa = await service.findById(req.params.id);
            if (!empresa) return res.status(404).json({ error: 'Empresa não encontrada' });
            res.json(empresa);
        } catch (err) { next(err); }
    }
];

exports.atualizarEmpresa = [
    param('id').isInt().withMessage('ID inválido'),
    async (req, res, next) => {
        try {
            const empresa = await service.update(req.params.id, req.body);
            if (!empresa) return res.status(404).json({ error: 'Empresa não encontrada' });
            res.json(empresa);
        } catch (err) { next(err); }
    }
];

exports.removerEmpresa = [
    param('id').isInt().withMessage('ID inválido'),
    async (req, res, next) => {
        try {
            const ok = await service.remove(req.params.id);
            if (!ok) return res.status(404).json({ error: 'Empresa não encontrada' });
            res.status(204).send();
        } catch (err) { next(err); }
    }
];
