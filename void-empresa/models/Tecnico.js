const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Campanha = require('./Campanha');

const Tecnico = sequelize.define('Tecnico', {
    nome: { type: DataTypes.STRING, allowNull: false }
}, {
    tableName: 'tecnicos',
    timestamps: false
});

Tecnico.belongsTo(Campanha, { foreignKey: 'campanha_id', onDelete: 'CASCADE' });

module.exports = Tecnico;
