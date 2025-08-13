const { body, validationResult, param } = require('express-validator');
const service = require('../services/produtorService');
const ProdutorCampanha = require('../models/ProdutorCampanha');

exports.cadastrarProdutor = [
    body('nome').notEmpty(),
    body('localizacao').notEmpty(),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const produtor = await service.create(req.body);
            res.status(201).json(produtor);
        } catch (err) { next(err); }
    }
];

exports.listarProdutores = async (req, res, next) => {
    try {
        res.json(await service.findAll());
    } catch (err) { next(err); }
};

exports.obterProdutor = [
    param('id').isInt(),
    async (req, res, next) => {
        try {
            const produtor = await service.findById(req.params.id);
            if (!produtor) return res.status(404).json({ error: 'Produtor não encontrado' });
            res.json(produtor);
        } catch (err) { next(err); }
    }
];

exports.atualizarProdutor = [
    param('id').isInt(),
    async (req, res, next) => {
        try {
            const produtor = await service.update(req.params.id, req.body);
            if (!produtor) return res.status(404).json({ error: 'Produtor não encontrado' });
            res.json(produtor);
        } catch (err) { next(err); }
    }
];

exports.removerProdutor = [
    param('id').isInt(),
    async (req, res, next) => {
        try {
            const ok = await service.remove(req.params.id);
            if (!ok) return res.status(404).json({ error: 'Produtor não encontrado' });
            res.status(204).send();
        } catch (err) { next(err); }
    }
];

exports.atribuirProdutor = [
    body('produtor_id').isInt(),
    body('tecnico_id').isInt(),
    body('campanha_id').isInt(),
    async (req, res, next) => {
        try {
            const relacao = await ProdutorCampanha.create(req.body);
            res.status(201).json({ message: 'Produtor atribuído com sucesso', relacao });
        } catch (err) { next(err); }
    }
];

exports.transferirProdutor = [
    body('produtor_id').isInt(),
    body('tecnico_antigo_id').isInt(),
    body('tecnico_novo_id').isInt(),
    body('campanha_id').isInt(),
    async (req, res, next) => {
        try {
            const { produtor_id, tecnico_antigo_id, tecnico_novo_id, campanha_id } = req.body;
            const relacao = await ProdutorCampanha.findOne({
                where: { produtor_id, tecnico_id: tecnico_antigo_id, campanha_id }
            });
            if (!relacao) return res.status(404).json({ error: 'Relacionamento não encontrado' });

            relacao.tecnico_id = tecnico_novo_id;
            await relacao.save();
            res.json({ message: 'Produtor transferido com sucesso', relacao });
        } catch (err) { next(err); }
    }
];
