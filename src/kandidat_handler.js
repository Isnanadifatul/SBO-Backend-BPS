
const { Kandidat, insertUser,updateKandidat, deleteKandidat } = require('../models/kandidat');


async function createKandidat(request, h) {
  try {
    const {triwulan, nomor_kandidat, nama_kandidat} = request.payload;

  
    // Insert user baru
    await insertUser(triwulan, nomor_kandidat, nama_kandidat);
    

    return h.response('Input Succes').code(201);
    } catch (error) {
    console.error(error);
    return h.response('Internal Server Error').code(500);
    }


    };

const getKandidat = async (request, h) => {
  try {
    const getKandidat = await Kandidat.findAll();
    console.log('getKandidat:', getKandidat);
    return getKandidat; // Mengembalikan nilai
} catch (error) {
    console.error('Error membaca data:', error);
    throw error; // Melemparkan kesalahan
}
}

const getKandidatid = async (request, h) => {
  const { id } = request.params;
  const kandidat = await Kandidat.findByPk(id);

  if (kandidat) {
    return kandidat;
  }
  return h.response({ message: 'Kandidat tidak ditemukan' }).code(404);
};

const updateKandidatHandler = async (request, h) => {
  const id = request.params.id;
const updateData = request.payload;

try {
  const result = await updateKandidat(id, updateData);
  if (result) {
    return h.response({ message: 'Update successful', result }).code(200);
  } else {
    return h.response({ message: 'User not found' }).code(404);
  }
} catch (error) {
  return h.response({ message: 'Error updating data', error: error.message }).code(500);
}
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
  getKandidatid,
  updateKandidatHandler,
  deleteKandidatHandler
};
