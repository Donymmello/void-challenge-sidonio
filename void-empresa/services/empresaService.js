// services/empresaService.js
const Empresa = require('../models/Empresa');

module.exports = {
  create: (data) => Empresa.create(data),
  findAll: () => Empresa.findAll(),
  findById: (id) => Empresa.findByPk(id),
  update: async (id, data) => {
    const emp = await Empresa.findByPk(id);
    if (!emp) return null;
    await emp.update(data);
    return emp;
  },
  remove: async (id) => {
    const emp = await Empresa.findByPk(id);
    if (!emp) return null;
    await emp.destroy();
    return true;
  }
};
