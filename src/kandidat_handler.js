const fs = require('fs');
const { Kandidat, insertKandidat, updateKandidat, deleteKandidat } = require('../models/kandidat');

const createKandidat = async (request, h) => {
  const { nomor_kandidat, nama_kandidat, foto } = request.payload;
  const base64Image = foto.toString('base64');
  const newKandidat = await insertKandidat(nomor_kandidat, nama_kandidat, base64Image);
  return { message: 'Kandidat berhasil ditambahkan', newKandidat };
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
