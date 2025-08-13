// services/produtorService.js
const Produtor = require('../models/Produtor');

module.exports = {
  create: (data) => Produtor.create(data),
  findAll: () => Produtor.findAll(),
  findById: (id) => Produtor.findByPk(id),
  update: async (id, data) => {
   const produtor = await Produtor.findByPk(id);
    if (!produtor) return null;
    await produtor.update(data);
    return produtor;
  },
  remove: async (id) => {
    const produtor = await Produtor.findByPk(id);
    if (!produtor) return null;
    await produtor.destroy();
    return true;
  }
};
