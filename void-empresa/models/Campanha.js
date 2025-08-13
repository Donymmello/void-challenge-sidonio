const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Empresa = require('./Empresa');

const Campanha = sequelize.define('Campanha', {
    nome: { type: DataTypes.STRING, allowNull: false },
    data_inicio: { type: DataTypes.DATEONLY, allowNull: false },
    data_fim: { type: DataTypes.DATEONLY }
}, {
    tableName: 'campanhas',
    timestamps: false
});

Campanha.belongsTo(Empresa, { foreignKey: 'empresa_id', onDelete: 'CASCADE' });

module.exports = Campanha;
