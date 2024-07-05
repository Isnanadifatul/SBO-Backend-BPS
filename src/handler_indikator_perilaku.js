const {DataTypes, Op} = require('sequelize');
const {insertUser, indikator_perilaku, updateIndikatorPerilaku, deleteIndikatorPerilaku} = require('../models/indikator_perilaku');
const { connection } = require('../db-config/connect');

async function createIndikatorPerilakuHandler(request, h) {
  try {
    const {no, indikator} = request.payload;

  
    // Insert user baru
    await insertUser(no, indikator);
    

    return h.response('Input Succes').code(201);
    } catch (error) {
    console.error(error);
    return h.response('Internal Server Error').code(500);
    }


    };

// Fungsi untuk membaca semua data
async function readAllIndikatorPerilaku() {
  try {
      const indikatorPerilaku = await indikator_perilaku.findAll();
      console.log('indikaotorPerilaku:', indikatorPerilaku);
      return indikatorPerilaku; // Mengembalikan nilai
  } catch (error) {
      console.error('Error membaca data pasien:', error);
      throw error; // Melemparkan kesalahan
  }
}

//Handler get data by id
const getUserByIdPerilaku = async (request, h) => {
  const userId = request.params.id;
  try {
    const user = await indikator_perilaku.findByPk(userId);
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
const updateIndikatorPerilakuHandler = async (request, h) => {
    try {
      const {id} = request.params; // Asumsi ID pegawai datang dari parameter URL
      const newData = request.payload; // Data baru dari payload request
  
      console.log('id:', id);
      console.log('New Data:', newData);
  
      const result = await updateIndikatorPerilaku(id, newData);
  
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

  const deleteIndikatorPerilakuHandler = async (request, h) => {
    try {
      const { id } = request.params; // Asumsi ID pegawai datang dari parameter URL
  
      console.log('id:', id);
  
      const result = await deleteIndikatorPerilaku(id);
  
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


module.exports = {getUserByIdPerilaku, createIndikatorPerilakuHandler, readAllIndikatorPerilaku, updateIndikatorPerilakuHandler, deleteIndikatorPerilakuHandler};
