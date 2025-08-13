const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Empresa = sequelize.define('Empresa', {
    nome: { type: DataTypes.STRING, allowNull: false },
    cnpj: { type: DataTypes.STRING, allowNull: false, unique: true },
    telefone: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING }
}, {
    tableName: 'empresas',
    timestamps: false
});

module.exports = Empresa;
