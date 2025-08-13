const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Produtor = require('./Produtor');
const Tecnico = require('./Tecnico');
const Campanha = require('./Campanha');

const ProdutorCampanha = sequelize.define('ProdutorCampanha', {
    data_registro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    data_transferencia: { type: DataTypes.DATE, allowNull: true }
}, {
    tableName: 'produtores_campanhas',
    timestamps: false
});

ProdutorCampanha.belongsTo(Produtor, { foreignKey: 'produtor_id', onDelete: 'CASCADE' });
ProdutorCampanha.belongsTo(Tecnico, { foreignKey: 'tecnico_id', onDelete: 'CASCADE' });
ProdutorCampanha.belongsTo(Campanha, { foreignKey: 'campanha_id', onDelete: 'CASCADE' });

module.exports = ProdutorCampanha;
