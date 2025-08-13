const { body, validationResult, param } = require('express-validator');
const service = require('../services/tecnicoService');
const Produtor = require('../models/Produtor');
const ProdutorCampanha = require('../models/ProdutorCampanha');

exports.cadastrarTecnico = [
    body('nome').notEmpty(),
    body('campanha_id').isInt(),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const tecnico = await service.create(req.body);
            res.status(201).json(tecnico);
        } catch (err) { next(err); }
    }
];

exports.listarTecnicos = async (req, res, next) => {
    try {
        res.json(await service.findAll());
    } catch (err) { next(err); }
};

exports.obterTecnico = [
    param('id').isInt(),
    async (req, res, next) => {
        try {
            const tecnico = await service.findById(req.params.id);
            if (!tecnico) return res.status(404).json({ error: 'Técnico não encontrado' });
            res.json(tecnico);
        } catch (err) { next(err); }
    }
];

exports.atualizarTecnico = [
    param('id').isInt(),
    async (req, res, next) => {
        try {
            const tecnico = await service.update(req.params.id, req.body);
            if (!tecnico) return res.status(404).json({ error: 'Técnico não encontrado' });
            res.json(tecnico);
        } catch (err) { next(err); }
    }
];

exports.removerTecnico = [
    param('id').isInt(),
    async (req, res, next) => {
        try {
            const ok = await service.remove(req.params.id);
            if (!ok) return res.status(404).json({ error: 'Técnico não encontrado' });
            res.status(204).send();
        } catch (err) { next(err); }
    }
];

exports.listarProdutoresPorTecnico = [
    param('id').isInt(),
    async (req, res, next) => {
        try {
            const produtores = await ProdutorCampanha.findAll({
                where: { tecnico_id: req.params.id },
                include: [{ model: Produtor, attributes: ['id', 'nome', 'localizacao'] }]
            });
            res.json(produtores.map(p => p.Produtor));
        } catch (err) { next(err); }
    }
];
