const fs = require('fs');
const { Kandidat, updateKandidat, deleteKandidat } = require('../models/kandidat');

const createKandidat = async (request, h) => {
  const { triwulan, nomor_kandidat, nama_kandidat } = request.payload;
  const foto = request.payload.foto._data;

  try {
      const newKandidat = await Kandidat.create({ triwulan, nomor_kandidat, nama_kandidat, foto });
      return h.response(newKandidat).code(201);
  } catch (error) {
      console.error(error);
      return h.response({ error: 'Failed to add kandidat' }).code(500);
  }
};

const getKandidat = async (request, h) => {
  const { id } = request.params;
  const kandidat = await Kandidat.findByPk(id);

  if (kandidat) {
    return kandidat;
  }
  return h.response({ message: 'Kandidat tidak ditemukan' }).code(404);
};

const updateKandidatHandler = async (request, h) => {
  const { id } = request.params;
  const { nomor_kandidat, nama_kandidat, foto } = request.payload;
  const base64Image = foto.toString('base64');

  const success = await updateKandidat(id, { nomor_kandidat, nama_kandidat, foto: base64Image });
  if (success) {
    return { message: 'Kandidat berhasil diperbarui' };
  }
  return h.response({ message: 'Kandidat tidak ditemukan' }).code(404);
};

const deleteKandidatHandler = async (request, h) => {
  const { id } = request.params;
  const success = await deleteKandidat(id);

  if (success) {
    return { message: 'Kandidat berhasil dihapus' };
  }
  return h.response({ message: 'Kandidat tidak ditemukan' }).code(404);
};

module.exports = {
  createKandidat,
  getKandidat,
  updateKandidatHandler,
  deleteKandidatHandler
};
