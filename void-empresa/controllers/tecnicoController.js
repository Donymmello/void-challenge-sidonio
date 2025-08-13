const { body, validationResult } = require('express-validator');
const Tecnico = require('../models/Tecnico');
const ProdutorCampanha = require('../models/ProdutorCampanha');
const Produtor = require('../models/Produtor');

exports.cadastrarTecnico = [
    body('nome').notEmpty().withMessage('Nome é obrigatório'),
    body('campanha_id').notEmpty().withMessage('campanha_id é obrigatório'), 
    
    async (req, res) => {
        console.log('Recebendo requisição POST /tecnicos:', req.body);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Erros de validação:', errors.array());
             return res.status(400).json({ errors: errors.array() });
        }

        try {
            const tecnico = await Tecnico.create(req.body);
            console.log('Técnico criado com sucesso:', tecnico.toJSON());
            // Associa o técnico à campanha
            res.status(201).json(tecnico);
        } catch (err) {
            console.error('Erro ao criar técnico:', err);
            // Verifica se é erro de campanha_id inválido
            if (err.name === 'SequelizeForeignKeyConstraintError') {
                return res.status(400).json({ error: 'Campanha não encontrada' });
            }
            res.status(500).json({ error: err.message });
        }
    }
];

exports.listarProdutoresPorTecnico = async (req, res) => {
    try {
        const tecnicoId = req.params.id;
        const produtores = await ProdutorCampanha.findAll({
            where: { tecnico_id: tecnicoId },
            include: [{ model: Produtor, attributes: ['id', 'nome', 'localizacao'] }]
        });
        res.json(produtores.map(p => p.Produtor));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
