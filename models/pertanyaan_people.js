const connection = require('../db-config/connect');
const {DataTypes} = require('sequelize');
const mysql = require('mysql2/promise');

const dbConnection = connection.connect;

const pertanyaan_peop = dbConnection.define('pertanyaan_people', {
    
    id_pertanyaan:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nomor:{
        type: DataTypes.INTEGER
    },
    label: {
        type: DataTypes.STRING,
    },
    pertanyaan_people:{
        type: DataTypes.STRING
     }
},

{
    tableName: 'pertanyaan_people',
    freezeTablename: true,
    timestamps: false
});


  // Insert Indikator people
  const insertUser = async (nomor, pertanyaan_people) => {
    try {
      const newUser = await pertanyaan_peop.create({nomor, pertanyaan_people});
      console.log('User inserted:', newUser.toJSON());
    } catch (error) {
      console.error('Error inserting user:', error.message);
      throw error;
    }
  };

  async function updatePertanyaanPeople(id_pertanyaan, newData) {
    try {
      const result = await pertanyaan_peop.update(newData, {
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

  async function deletePertanyaanPeople(id_pertanyaan) {
    try {
      const result = await pertanyaan_peop.destroy({
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
      console.error('Data data:', error);
      throw error;
    }
  }




module.exports = { pertanyaan_peop, insertUser, updatePertanyaanPeople, deletePertanyaanPeople};
