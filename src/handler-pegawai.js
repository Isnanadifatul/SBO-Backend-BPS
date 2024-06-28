//const bcrypt = require('bcrypt');
const {DataTypes, Op} = require('sequelize');
const {insertUser, updatePegawaiById, deletePegawaiById, Pegawai} = require('../models/pegawai');

async function createPegawai(request, h) {
  try {
    const {nip, nama, stat_jabatan, golongan_akhir, tmt_golongan, pendidikan, tanggal_lulus, jenis_kelamin, tanggal_lahir} = request.payload;

  
    // Insert user baru
    await insertUser(nip, nama, stat_jabatan, golongan_akhir, tmt_golongan, pendidikan, tanggal_lulus, jenis_kelamin, tanggal_lahir);
    

   
        // Proses registrasi sukses
    
        // Mengarahkan pengguna ke halaman lihat data pegawai
        return h.response('input sukses').code(202); // Pengalihan sementara (302)
    } catch (error) {
        console.error(error);
        return h.response('Internal Server Error').code(500);
    }


    }

// Fungsi untuk membaca semua data pegawai
async function readAllPegawai() {
    try {
        const pegawai = await Pegawai.findAll();
        console.log('Pegawai:', pegawai);
        return pegawai; // Mengembalikan nilai
    } catch (error) {
        console.error('Error membaca data pegawai:', error);
        throw error; // Melemparkan kesalahan
    }
  }


  const updatePegawaiHandler = async (request, h) => {
    try {
      const { id } = request.params; // Asumsi ID pegawai datang dari parameter URL
      const newData = request.payload; // Data baru dari payload request
  
      console.log('ID:', id);
      console.log('New Data:', newData);
  
      const result = await updatePegawaiById(id, newData);
  
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
  
  //delete pegawai
  const deletePegawaiHandler = async (request, h) => {
    try {
      const { id } = request.params; // Asumsi ID pegawai datang dari parameter URL
  
      console.log('ID:', id);
  
      const result = await deletePegawaiById(id);
  
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
  
  


  
module.exports = {createPegawai, readAllPegawai,updatePegawaiHandler, deletePegawaiHandler};

