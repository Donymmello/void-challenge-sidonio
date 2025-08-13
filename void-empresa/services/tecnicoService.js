// services/tecnicoService.js
const Tecnico = require('../models/Tecnico');

module.exports = {
  create: (data) => Tecnico.create(data),
  findAll: () => Tecnico.findAll(),
  findById: (id) => Tecnico.findByPk(id),
  update: async (id, data) => {
    const emp = await Tecnico.findByPk(id);
    if (!emp) return null;
    await emp.update(data);
    return emp;
  },
  remove: async (id) => {
    const emp = await Tecnico.findByPk(id);
    if (!emp) return null;
    await emp.destroy();
    return true;
  }
};
