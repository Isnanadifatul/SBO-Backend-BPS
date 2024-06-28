const {DataTypes, Op} = require('sequelize');
const {insertUser, indikator_people, updateIndikatorPeople, deleteIndikatorPeople} = require('../models/indikator_people');
const { connection } = require('../db-config/connect');

async function createHandler(request, h) {
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

// Fungsi untuk membaca semua data pasien
async function readAllindikator_people() {
  try {
      const indikatorPeople = await indikator_people.findAll();
      console.log('indikaotorPeople:', indikatorPeople);
      return indikatorPeople; // Mengembalikan nilai
  } catch (error) {
      console.error('Error membaca data pasien:', error);
      throw error; // Melemparkan kesalahan
  }
}

// Handler untuk mengupdate data berdasarkan ID
const updateIndikatorHandler = async (request, h) => {
    try {
      const { id } = request.params; // Asumsi ID pegawai datang dari parameter URL
      const newData = request.payload; // Data baru dari payload request
  
      console.log('id:', id);
      console.log('New Data:', newData);
  
      const result = await updateIndikatorPeople(id, newData);
  
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

  const deleteIndikatorHandler = async (request, h) => {
    try {
      const { id } = request.params; // Asumsi ID pegawai datang dari parameter URL
  
      console.log(id);
  
      const result = await deleteIndikatorPeople(id);
  
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


module.exports = {createHandler, readAllindikator_people, updateIndikatorHandler, deleteIndikatorHandler};
