const connection = require('../db-config/connect');
const {DataTypes} = require('sequelize');
const mysql = require('mysql2/promise');

const dbConnection = connection.connect;

const pertanyaan_perilaku = dbConnection.define('pertanyaan_perilaku', {
    
    id_pertanyaan:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nomor:{
        type: DataTypes.INTEGER
     },
    pertanyaan:{
        type: DataTypes.STRING
     }
},

{
    tableName: 'pertanyaan_perilaku',
    freezeTablename: true,
    timestamps: false
});


  // Insert Indikator people
  const insertUser = async (nomor, pertanyaan) => {
    try {
      const newUser = await pertanyaan_perilaku.create({nomor, pertanyaan});
      console.log('User inserted:', newUser.toJSON());
    } catch (error) {
      console.error('Error inserting user:', error.message);
      throw error;
    }
  };

  async function updatePertanyaanPerilaku(id_pertanyaan, newData) {
    try {
      const result = await pertanyaan_perilaku.update(newData, {
        where: { id_pertanyaan: id_pertanyaan },
      });
  
      if (result[0] > 0) {
        console.log(`Data dengan NO ${id_pertanyaan} berhasil diupdate.`);
        return result;
      } else {
        console.log(`Data dengan NO ${id_pertanyaan} tidak ditemukan.`);
        return null;
      }
    } catch (error) {
      console.error('Error mengupdate data:', error);
      throw error;
    }
  }

  async function deletePertanyaanPerilaku(id_pertanyaan) {
    try {
      const result = await pertanyaan_perilaku.destroy({
        where: {id_pertanyaan},
      });
  
      if (result > 0) {
        console.log(`Data dengan NO ${id_pertanyaan} berhasil dihapus.`);
        return result;
      } else {
        console.log(`data dengan NO ${id_pertanyaan} tidak ditemukan.`);
        return null;
      }
    } catch (error) {
      console.error('Error menghapus data:', error);
      throw error;
    }
  }




module.exports = { pertanyaan_perilaku, insertUser, updatePertanyaanPerilaku, deletePertanyaanPerilaku};
