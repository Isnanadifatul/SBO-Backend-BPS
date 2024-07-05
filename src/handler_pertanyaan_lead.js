const {DataTypes, Op} = require('sequelize');
const {pertanyaan_lead, insertUser, updatePertanyaanLead, deletePertanyaanLead} = require('../models/pertanyaan_lead');
const { connection } = require('../db-config/connect');

async function createPertanyaanLeadHandler(request, h) {
  try {
    const {nomor, pertanyaan_leadership} = request.payload;

  
    // Insert user baru
    await insertUser(nomor, pertanyaan_leadership);
    

    return h.response('Input Succes').code(201);
    } catch (error) {
    console.error(error);
    return h.response('Internal Server Error').code(500);
    }


    };

// Fungsi untuk membaca semua data
async function readAllPertanyaanLead() {
  try {
      const pertanyaanLead = await pertanyaan_lead.findAll();
      console.log('pertanyaanLead:', pertanyaanLead);
      return pertanyaanLead; // Mengembalikan nilai
  } catch (error) {
      console.error('Error membaca data:', error);
      throw error; // Melemparkan kesalahan
  }
}

//Handler get data by id
const getUserByIdPertanyaanLead = async (request, h) => {
    const id_pertanyaan = request.params.id;
    try {
      const user = await pertanyaan_lead.findByPk(id_pertanyaan);
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
const updatePertanyaanLeadHandler = async (request, h) => {
    const id_pertanyaan = request.params.id;
  const updateData = request.payload;

  try {
    const result = await updatePertanyaanLead(id_pertanyaan, updateData);
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

  const deletePertanyaanLeadHandler = async (request, h) => {
    const id_pertanyaan = request.params.id;

  try {
    const result = await deletePertanyaanLead(id_pertanyaan);
    if (result) {
      return h.response({ message: 'Delete successful' }).code(200);
    } else {
      return h.response({ message: 'User not found' }).code(404);
    }
  } catch (error) {
    return h.response({ message: 'Error deleting data', error: error.message }).code(500);
  }
};



module.exports = {getUserByIdPertanyaanLead, createPertanyaanLeadHandler, readAllPertanyaanLead, updatePertanyaanLeadHandler, deletePertanyaanLeadHandler};
