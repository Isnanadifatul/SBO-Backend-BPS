//const bcrypt = require('bcrypt');
const {DataTypes, Op} = require('sequelize');
const {insertUser, getPegawaiById, updatePegawaiById, deletePegawaiById, Pegawai} = require('../models/pegawai');
const {Authentication} = require('../models/authentication');
const connection = require('../db-config/connect');
const dbConnection = connection.connect;


async function createPegawai(request, h) {
  try {
    const {nip, nama, stat_jabatan, golongan_akhir, tmt_golongan, pendidikan, tanggal_lulus, jenis_kelamin, tanggal_lahir} = request.payload;

  
    // Insert user baru
    await insertUser(nip, nama, stat_jabatan, golongan_akhir, tmt_golongan, pendidikan, tanggal_lulus, jenis_kelamin, tanggal_lahir);
    
    
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

//handler get by id pegawai
  const getPegawaiByIdhandler = async (request, h) => {
    const id = request.params.id;
    
    try {
      const pegawai = await getPegawaiById(id);
      return h.response(pegawai).code(200);
    } catch (error) {
      return h.response({ error: error.message }).code(404);
    }
  };  

//Function untuk mengupdate pegawai
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

  
// Asosiasi dengan Pegawai
Authentication.belongsTo(Pegawai, { foreignKey: 'nip', targetKey: 'nip' });
// Asosiasi dengan Authentication
Pegawai.hasMany(Authentication, { foreignKey: 'nip', sourceKey: 'nip' });

  //delete pegawai
  const deletePegawaiHandler = async (request, h) => {
    const transaction = await dbConnection.transaction(); // Mulai transaksi
    try {
      const { id } = request.params; // Asumsi ID pegawai datang dari parameter URL
  
      console.log('ID:', id);
  
      // Hapus data Authentication terkait terlebih dahulu
      const authResult = await Authentication.destroy({
        where: { nip: id },
        transaction, // Sertakan transaksi
      });
  
      if (authResult > 0) {
        // Hapus data Pegawai setelah data Authentication berhasil dihapus
        const pegawaiResult = await Pegawai.destroy({
          where: { nip: id },
          transaction, // Sertakan transaksi
        });
  
        // Jika semua operasi berhasil, komit transaksi
        await transaction.commit();
  
        return h.response(`Data pegawai dengan ID ${id} dan akun autentikasi terkait berhasil dihapus.`).code(200);
      } else {
        // Jika data Authentication tidak ditemukan, rollback transaksi
        await transaction.rollback();
        return h.response(`Data autentikasi terkait dengan ID pegawai ${id} tidak ditemukan.`).code(404);
      }
    } catch (error) {
      // Jika terjadi kesalahan, rollback transaksi
      await transaction.rollback();
      console.error('Error menghapus data pegawai:', error);
      return h.response(`Error menghapus data pegawai: ${error.message}`).code(500);
    }
  };
    
module.exports = {createPegawai, readAllPegawai,updatePegawaiHandler, deletePegawaiHandler, getPegawaiByIdhandler};

