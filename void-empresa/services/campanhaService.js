// services/campanhaService.js
const Campanha = require('../models/Campanha');

module.exports = {
  create: (data) => Campanha.create(data),
  findAll: () => Campanha.findAll(),
  findById: (id) => Campanha.findByPk(id),
  update: async (id, data) => {
    const emp = await Campanha.findByPk(id);
    if (!emp) return null;
    await emp.update(data);
    return emp;
  },
  remove: async (id) => {
    const emp = await Campanha.findByPk(id);
    if (!emp) return null;
    await emp.destroy();
    return true;
  }
};
