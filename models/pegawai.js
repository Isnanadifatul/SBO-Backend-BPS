const connection = require('../db-config/connect');
const {DataTypes} = require('sequelize');
const mysql = require('mysql2/promise');

const dbConnection = connection.connect;

// create database using models
const Pegawai = dbConnection.define('Pegawai', {
  nip: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  nama: {
    type: DataTypes.STRING,
  },
  stat_jabatan: {
    type: DataTypes.STRING,
  },
  golongan_akhir: {
    type: DataTypes.STRING,
  },
  tmt_golongan: {
    type: DataTypes.DATE,
  },
  pendidikan: {
    type: DataTypes.STRING,
  },
  tanggal_lulus: {
    type: DataTypes.DATE,
  },
  jenis_kelamin: {
    type: DataTypes.STRING,
  },
  tanggal_lahir: {
    type: DataTypes.DATE,
  },
}, 
{
  tableName: "pegawai",
  freezeTableName: true,
  timestamps: false
});


// Insert pasien baru
  const insertUser = async (nip, nama, stat_jabatan, golongan_akhir, tmt_golongan, pendidikan, tanggal_lulus, jenis_kelamin, tanggal_lahir) => {
    try {
      const newUser = await Pegawai.create({ nip, nama, stat_jabatan, golongan_akhir, tmt_golongan, pendidikan, tanggal_lulus, jenis_kelamin, tanggal_lahir});
      console.log('User inserted:', newUser.toJSON());
    } catch (error) {
      console.error('Error inserting user:', error.message);
      throw error;
    }
  };

  //update pegawai
  async function updatePegawaiById(id, newData) {
    try {
      const result = await Pegawai.update(newData, {
        where: { nip: id },
      });
  
      if (result[0] > 0) {
        console.log(`Data pegawai dengan ID ${id} berhasil diupdate.`);
        return result;
      } else {
        console.log(`Data pegawai dengan ID ${id} tidak ditemukan.`);
        return null;
      }
    } catch (error) {
      console.error('Error mengupdate data pegawai:', error);
      throw error;
    }
  }
  

  //delete pegawai
  async function deletePegawaiById(id) {
    try {
      const result = await Pegawai.destroy({
        where: { nip: id },
      });
  
      if (result > 0) {
        console.log(`Data pegawai dengan ID ${id} berhasil dihapus.`);
        return result;
      } else {
        console.log(`Data pegawai dengan ID ${id} tidak ditemukan.`);
        return null;
      }
    } catch (error) {
      console.error('Error menghapus data pegawai:', error);
      throw error;
    }
  }

  //read pegawai by ID
  async function getPegawaiById(id) {
    try {
      // Convert id to string to maintain precision
      const idString = String(id);
  
      const pegawai = await Pegawai.findByPk(idString); // Menggunakan findByPk dengan id dalam bentuk string
      if (!pegawai) {
        throw new Error('Pegawai tidak ditemukan');
      }
      return pegawai;
    } catch (error) {
      console.error('Error membaca data pegawai:', error);
      throw error; // Melemparkan kesalahan
    }
  }
  
module.exports = {Pegawai, insertUser, updatePegawaiById, deletePegawaiById, getPegawaiById };
