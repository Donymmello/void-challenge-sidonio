module.exports = (err, req, res, next) => {
    console.error('Erro capturado:', err);

    // Erros de validação do Sequelize
    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
            error: 'Erro de validação',
            detalhes: err.errors.map(e => e.message)
        });
    }

    // Erro de chave única (ex: CNPJ duplicado)
    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({
            error: 'Registro duplicado',
            detalhes: err.errors.map(e => e.message)
        });
    }

    // Erros de formato de JSON
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            error: 'JSON mal formatado'
        });
    }

    // Erros genéricos
    res.status(500).json({
        error: 'Erro interno do servidor',
        detalhes: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};
