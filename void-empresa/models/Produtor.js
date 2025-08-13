const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Produtor = sequelize.define('Produtor', {
    nome: { type: DataTypes.STRING, allowNull: false },
    localizacao: { type: DataTypes.STRING, allowNull: false }
}, {
    tableName: 'produtores',
    timestamps: false
});

module.exports = Produtor;
