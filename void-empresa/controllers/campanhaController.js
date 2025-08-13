const { body, validationResult, param } = require('express-validator');
const service = require('../services/campanhaService');

exports.cadastrarCampanha = [
    body('nome').notEmpty().withMessage('Nome é obrigatório'),
    body('empresa_id').isInt().withMessage('empresa_id inválido'),
    body('data_inicio').isISO8601().withMessage('Data início inválida'),
    body('data_fim').isISO8601().withMessage('Data fim inválida'),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const campanha = await service.create(req.body);
            res.status(201).json(campanha);
        } catch (err) { next(err); }
    }
];

exports.listarCampanhas = async (req, res, next) => {
    try {
        res.json(await service.findAll());
    } catch (err) { next(err); }
};

exports.obterCampanha = [
    param('id').isInt(),
    async (req, res, next) => {
        try {
            const campanha = await service.findById(req.params.id);
            if (!campanha) return res.status(404).json({ error: 'Campanha não encontrada' });
            res.json(campanha);
        } catch (err) { next(err); }
    }
];

exports.atualizarCampanha = [
    param('id').isInt(),
    async (req, res, next) => {
        try {
            const campanha = await service.update(req.params.id, req.body);
            if (!campanha) return res.status(404).json({ error: 'Campanha não encontrada' });
            res.json(campanha);
        } catch (err) { next(err); }
    }
];

exports.removerCampanha = [
    param('id').isInt(),
    async (req, res, next) => {
        try {
            const ok = await service.remove(req.params.id);
            if (!ok) return res.status(404).json({ error: 'Campanha não encontrada' });
            res.status(204).send();
        } catch (err) { next(err); }
    }
];
