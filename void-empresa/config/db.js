const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('void_empresa', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

sequelize.authenticate()
    .then(() => console.log('MySQL conectado com Sequelize!'))
    .catch(err => console.error('Erro ao conectar ao MySQL:', err));

module.exports = sequelize;
