const {DataTypes, Op} = require('sequelize');
const {insertUser, list_model, updateModelImplementasi, deleteModelImplementasi} = require('../models/model_implementasi');
const { connection } = require('../db-config/connect');

async function createMiHandler(request, h) {
  try {
    const {variabel_leadership, variabel_people, variabel_system} = request.payload;

  
    // Insert user baru
    await insertUser(variabel_leadership, variabel_people, variabel_system);
    

    return h.response('Input Succes').code(201);
    } catch (error) {
    console.error(error);
    return h.response('Internal Server Error').code(500);
    }


    };

// Fungsi untuk membaca semua data
async function readAllMiHandler() {
  try {
      const modelImplementasi = await list_model.findAll();
      console.log('modelImplementasi:', modelImplementasi);
      return modelImplementasi; // Mengembalikan nilai
  } catch (error) {
      console.error('Error membaca data pasien:', error);
      throw error; // Melemparkan kesalahan
  }
}

//Handler get data by id
const getUserByIdMi = async (request, h) => {
  const userId = request.params.id;
  try {
    const user = await list_model .findByPk(userId);
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
const updateMiHandler = async (request, h) => {
    try {
      const {id} = request.params; // Asumsi ID pegawai datang dari parameter URL
      const newData = request.payload; // Data baru dari payload request
  
      console.log('id:', id);
      console.log('New Data:', newData);
  
      const result = await updateModelImplementasi(id, newData);
  
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

  const deleteMiHandler = async (request, h) => {
    try {
      const { id } = request.params; // Asumsi ID pegawai datang dari parameter URL
  
      console.log('id:', id);
  
      const result = await deleteModelImplementasi(id);
  
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


module.exports = {getUserByIdMi, createMiHandler, readAllMiHandler, updateMiHandler, deleteMiHandler};
