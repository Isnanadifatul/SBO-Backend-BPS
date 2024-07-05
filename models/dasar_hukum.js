const connection = require('../db-config/connect');
const {DataTypes} = require('sequelize');
const mysql = require('mysql2/promise');

const dbConnection = connection.connect;

const konsep_dasar_hukum = dbConnection.define('konsep_dasar_hukum', {
    
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    no:{
        type: DataTypes.INTEGER
     },
    dasar_hukum:{
        type: DataTypes.STRING
     }
},

{
    tableName: 'konsep_dasar_hukum',
    freezeTablename: true,
    timestamps: false
});


  // Insert dasar hukum
  const insertUser = async (no, dasar_hukum) => {
    try {
      const newUser = await konsep_dasar_hukum.create({no, dasar_hukum});
      console.log('User inserted:', newUser.toJSON());
    } catch (error) {
      console.error('Error inserting user:', error.message);
      throw error;
    }
  };

  async function updateDh(id, newData) {
    try {
      const result = await konsep_dasar_hukum.update(newData, {
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

  async function deleteDh(id) {
    try {
      const result = await konsep_dasar_hukum.destroy({
        where: {id},
      });
  
      if (result > 0) {
        console.log(`Indikator dengan NO ${id} berhasil dihapus.`);
        return result;
      } else {
        console.log(`Indikator dengan NO ${id} tidak ditemukan.`);
        return null;
      }
    } catch (error) {
      console.error('Error menghapus data:', error);
      throw error;
    }
  }




module.exports = { konsep_dasar_hukum, insertUser, updateDh, deleteDh};
