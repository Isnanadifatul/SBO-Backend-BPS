const {DataTypes, Op} = require('sequelize');
const {insertUser, konsep_dasar_hukum, updateDh, deleteDh} = require('../models/dasar_hukum');
const { connection } = require('../db-config/connect');

async function createDhHandler(request, h) {
  try {
    const {no, dasar_hukum} = request.payload;

  
    // Insert user baru
    await insertUser(no, dasar_hukum);
    

    return h.response('Input Succes').code(201);
    } catch (error) {
    console.error(error);
    return h.response('Internal Server Error').code(500);
    }


    };

// Fungsi untuk membaca semua data
async function readAllDh() {
  try {
      const konsepDh = await konsep_dasar_hukum.findAll();
      console.log('konsepDh:', konsepDh);
      return konsepDh; // Mengembalikan nilai
  } catch (error) {
      console.error('Error membaca data pasien:', error);
      throw error; // Melemparkan kesalahan
  }
}

//Handler get data by id
const getUserByIdKonsepDh= async (request, h) => {
  const userId = request.params.id;
  try {
    const user = await konsep_dasar_hukum .findByPk(userId);
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
const updateDhHandler = async (request, h) => {
    try {
      const {id} = request.params; // Asumsi ID pegawai datang dari parameter URL
      const newData = request.payload; // Data baru dari payload request
  
      console.log('id:', id);
      console.log('New Data:', newData);
  
      const result = await updateDh(id, newData);
  
      if (result) {
        return h.response(`Data pegawai dengan ID ${id} berhasil diupdate.`).code(200);
      } else {
        return h.response(`Data pegawai dengan ID ${id} tidak ditemukan.`).code(404);
      }
    } catch (error) {
      console.error('Error mengupdate data pegawai:', error);
      return h.response(`Error mengupdate data pegawai: ${error.message}`).code(500);
    }
  };
  
  // Handler untuk menghapus data berdasarkan ID

  const deleteDhHandler = async (request, h) => {
    try {
      const { id } = request.params; // Asumsi ID pegawai datang dari parameter URL
  
      console.log('id:', id);
  
      const result = await deleteDh(id);
  
      if (result) {
        return h.response(`Data pegawai dengan ID ${id} berhasil dihapus.`).code(200);
      } else {
        return h.response(`Data pegawai dengan ID ${id} tidak ditemukan.`).code(404);
      }
    } catch (error) {
      console.error('Error menghapus data pegawai:', error);
      return h.response(`Error menghapus data pegawai: ${error.message}`).code(500);
    }
  };


module.exports = {getUserByIdKonsepDh, createDhHandler, readAllDh, updateDhHandler, deleteDhHandler};
