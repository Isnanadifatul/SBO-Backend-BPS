const {DataTypes, Op} = require('sequelize');
const {insert, updateNilaiTambah, deleteNilaiTambah, nilai_tambah} = require('../models/nilai_tambah');
const { connection } = require('../db-config/connect');

async function insertNilaiTambah(request, h) {
  try {
    const {triwulan, nomor_kandidat, nama_kandidat, nilai_kip_app_1, nilai_kip_app_2, nilai_kip_app_3, nilai_presensi} = request.payload;

  
    // Insert user baru
    await insert(triwulan, nomor_kandidat, nama_kandidat, nilai_kip_app_1, nilai_kip_app_2, nilai_kip_app_3, nilai_presensi);
    

    return h.response('Input Succes').code(201);
    } catch (error) {
    console.error(error);
    return h.response('Internal Server Error').code(500);
    }


    };

// Fungsi untuk membaca semua data
async function readNilai() {
  try {
      const readNilaiTambah = await nilai_tambah.findAll();
      console.log('readNilaiTambah:', readNilaiTambah);
      return readNilaiTambah; // Mengembalikan nilai
  } catch (error) {
      console.error('Error membaca data:', error);
      throw error; // Melemparkan kesalahan
  }
}

//getbyid
const getNilaiById = async (request, h) => {
    const nilaiid = request.params.id;
    try {
      const nilai = await nilai_tambah.findByPk(nilaiid);
      if (nilai) {
        return h.response(nilai.toJSON()).code(200);
      } else {
        return h.response({ message: 'User not found' }).code(404);
      }
    } catch (error) {
      return h.response({ message: 'Error fetching user', error: error.message }).code(500);
    }
  };

// Handler untuk mengupdate data berdasarkan ID
const updateNilai = async (request, h) => {
    try {
      const {id} = request.params; // Asumsi ID pegawai datang dari parameter URL
      const newData = request.payload; // Data baru dari payload request
  
      console.log('id:', id);
      console.log('New Data:', newData);
  
      const result = await updateNilaiTambah(id, newData);
  
      if (result) {
        return h.response(`Data dengan ID ${id} berhasil diupdate.`).code(200);
      } else {
        return h.response(`Data dengan ID ${id} tidak ditemukan.`).code(404);
      }
    } catch (error) {
      console.error('Error mengupdate data:', error);
      return h.response(`Error mengupdate data pegawai: ${error.message}`).code(500);
    }
  };
  
  // Handler untuk menghapus data berdasarkan ID

  const deleteNilai = async (request, h) => {
    try {
      const { id } = request.params; // Asumsi ID pegawai datang dari parameter URL
  
      console.log('id:', id);
  
      const result = await deleteNilaiTambah(id);
  
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


module.exports = {
    readNilai, 
    insertNilaiTambah, 
    updateNilai, 
    deleteNilai,
    getNilaiById
};
