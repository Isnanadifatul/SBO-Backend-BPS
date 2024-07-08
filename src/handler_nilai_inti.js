const {DataTypes, Op} = require('sequelize');
const {list_inti_nilai, insertUser, updateNilaiInti, deleteNilaiInti} = require('../models/nilai_inti_bps');
const { connection } = require('../db-config/connect');

async function createNiHandler(request, h) {
  try {
    const {berorientasi_pelayanan, akuntabel, kompeten, harmonis, loyal, adaptif, kolaboratif} = request.payload;

  
    // Insert user baru
    await insertUser(berorientasi_pelayanan, akuntabel, kompeten, harmonis, loyal, adaptif, kolaboratif);
    

    return h.response('Input Succes').code(201);
    } catch (error) {
    console.error(error);
    return h.response('Internal Server Error').code(500);
    }


    };

// Fungsi untuk membaca semua data
async function readAllNiHandler() {
  try {
      const nilaiInti = await list_inti_nilai.findAll();
      console.log('nilaiInti:', nilaiInti);
      return nilaiInti; // Mengembalikan nilai
  } catch (error) {
      console.error('Error membaca data:', error);
      throw error; // Melemparkan kesalahan
  }
}

//Handler get data by id
const getUserByIdNi = async (request, h) => {
  const userId = request.params.id;
  try {
    const user = await list_inti_nilai .findByPk(userId);
    if (user) {
      return h.response(user.toJSON()).code(200);
    } else {
      return h.response({ message: 'User not found' }).code(404);
    }
  } catch (error) {
    return h.response({ message: 'Error fetching user', error: error.message }).code(500);
  }
};

// Handler untuk mengupdate data berdasarkan ID
const updateNiHandler = async (request, h) => {
    try {
      const {id} = request.params; // Asumsi ID pegawai datang dari parameter URL
      const newData = request.payload; // Data baru dari payload request
  
      console.log('id:', id);
      console.log('New Data:', newData);
  
      const result = await updateNilaiInti(id, newData);
  
      if (result) {
        return h.response(`Data dengan ID ${id} berhasil diupdate.`).code(200);
      } else {
        return h.response(`Data dengan ID ${id} tidak ditemukan.`).code(404);
      }
    } catch (error) {
      console.error('Error :', error);
      return h.response(`Error : ${error.message}`).code(500);
    }
  };
  
  // Handler untuk menghapus data berdasarkan ID

  const deleteNiHandler = async (request, h) => {
    try {
      const { id } = request.params; // Asumsi ID pegawai datang dari parameter URL
  
      console.log('id:', id);
  
      const result = await deleteNilaiInti(id);
  
      if (result) {
        return h.response(`Data dengan ID ${id} berhasil dihapus.`).code(200);
      } else {
        return h.response(`Data dengan ID ${id} tidak ditemukan.`).code(404);
      }
    } catch (error) {
      console.error('Error menghapus data pegawai:', error);
      return h.response(`Error menghapus data pegawai: ${error.message}`).code(500);
    }
  };


module.exports = {getUserByIdNi, createNiHandler, readAllNiHandler, updateNiHandler, deleteNiHandler};
