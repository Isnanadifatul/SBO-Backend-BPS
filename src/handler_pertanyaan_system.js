const {DataTypes, Op} = require('sequelize');
const {pertanyaan_sys, insertUser, updatePertanyaanSys, deletePertanyaanSys} = require('../models/pertanyaan_system');
const { connection } = require('../db-config/connect');

async function createPertanyaanSysHandler(request, h) {
  try {
    const {no, pertanyaan_system} = request.payload;

  
    // Insert user baru
    await insertUser(no, pertanyaan_system);
    

    return h.response('Input Succes').code(201);
    } catch (error) {
    console.error(error);
    return h.response('Internal Server Error').code(500);
    }


    };

// Fungsi untuk membaca semua data
async function readAllPertanyaanSys() {
  try {
      const pertanyaanSys= await pertanyaan_sys.findAll();
      console.log('pertanyaanSys:', pertanyaanSys);
      return pertanyaanSys; // Mengembalikan nilai
  } catch (error) {
      console.error('Error membaca data:', error);
      throw error; // Melemparkan kesalahan
  }
}

//Handler get data by id
const getUserByIdPertanyaanSys = async (request, h) => {
    const id_pertanyaan = request.params.id;
    try {
      const user = await pertanyaan_sys.findByPk(id_pertanyaan);
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
const updatePertanyaanSysHandler = async (request, h) => {
    const id_pertanyaan = request.params.id;
  const updateData = request.payload;

  try {
    const result = await updatePertanyaanSys(id_pertanyaan, updateData);
    if (result) {
      return h.response({ message: 'Update successful', result }).code(200);
    } else {
      return h.response({ message: 'User not found' }).code(404);
    }
  } catch (error) {
    return h.response({ message: 'Error updating data', error: error.message }).code(500);
  }
};
  
  // Handler untuk menghapus data berdasarkan ID

  const deletePertanyaanSysHandler = async (request, h) => {
    const id_pertanyaan = request.params.id;

  try {
    const result = await deletePertanyaanSys(id_pertanyaan);
    if (result) {
      return h.response({ message: 'Delete successful' }).code(200);
    } else {
      return h.response({ message: 'User not found' }).code(404);
    }
  } catch (error) {
    return h.response({ message: 'Error deleting data', error: error.message }).code(500);
  }
};



module.exports = {getUserByIdPertanyaanSys, createPertanyaanSysHandler, readAllPertanyaanSys, updatePertanyaanSysHandler, deletePertanyaanSysHandler};
