const connection = require('../db-config/connect');
const {DataTypes} = require('sequelize');
const mysql = require('mysql2/promise');

const dbConnection = connection.connect;

const list_inti_nilai = dbConnection.define('list_inti_nilai', {
    
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    berorientasi_pelayanan:{
        type: DataTypes.STRING
     },
    akuntabel:{
        type: DataTypes.STRING
     },
    kompeten:{
        type: DataTypes.STRING
     },
    harmonis:{
        type: DataTypes.STRING
     },
    loyal:{
        type: DataTypes.STRING
     },
    adaptif:{
        type: DataTypes.STRING
     },
    kolaboratif:{
        type: DataTypes.STRING
     }
},

{
    tableName: 'list_nilai_inti',
    freezeTablename: true,
    timestamps: false
});


  // Insert dasar hukum
  const insertUser = async (berorientasi_pelayanan, akuntabel, kompeten, harmonis, loyal, adaptif, kolaboratif) => {
    try {
      const newUser = await list_inti_nilai.create({berorientasi_pelayanan, akuntabel, kompeten, harmonis, loyal, adaptif, kolaboratif});
      console.log('User inserted:', newUser.toJSON());
    } catch (error) {
      console.error('Error inserting user:', error.message);
      throw error;
    }
  };

  async function updateNilaiInti(id, newData) {
    try {
      const result = await list_inti_nilai.update(newData, {
        where: { id: id },
      });
  
      if (result[0] > 0) {
        console.log(`Data dengan NO ${id} berhasil diupdate.`);
        return result;
      } else {
        console.log(`Data dengan NO ${id} tidak ditemukan.`);
        return null;
      }
    } catch (error) {
      console.error('Error mengupdate data:', error);
      throw error;
    }
  }

  async function deleteNilaiInti(id) {
    try {
      const result = await list_inti_nilai.destroy({
        where: {id},
      });
  
      if (result > 0) {
        console.log(`Data dengan NO ${id} berhasil dihapus.`);
        return result;
      } else {
        console.log(`Data dengan NO ${id} tidak ditemukan.`);
        return null;
      }
    } catch (error) {
      console.error('Error menghapus data:', error);
      throw error;
    }
  }




module.exports = { list_inti_nilai, insertUser, updateNilaiInti, deleteNilaiInti};
