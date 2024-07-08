const connection = require('../db-config/connect');
const {DataTypes} = require('sequelize');
const mysql = require('mysql2/promise');

const dbConnection = connection.connect;

const indikator_perilaku = dbConnection.define('indikator_perilaku', {
    
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    no:{
        type: DataTypes.INTEGER
     },
    indikator:{
        type: DataTypes.STRING
     }
},

{
    tableName: 'indikator_perilaku',
    freezeTablename: true,
    timestamps: false
});


  // Insert Indikator people
  const insertUser = async (no, indikator) => {
    try {
      const newUser = await indikator_perilaku.create({no, indikator});
      console.log('User inserted:', newUser.toJSON());
    } catch (error) {
      console.error('Error inserting user:', error.message);
      throw error;
    }
  };

  async function updateIndikatorPerilaku(id, newData) {
    try {
      const result = await indikator_perilaku.update(newData, {
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

  async function deleteIndikatorPerilaku(id) {
    try {
      const result = await indikator_perilaku.destroy({
        where: {id},
      });
  
      if (result > 0) {
        console.log(`Indikator People dengan NO ${id} berhasil dihapus.`);
        return result;
      } else {
        console.log(`Indikator People dengan NO ${id} tidak ditemukan.`);
        return null;
      }
    } catch (error) {
      console.error('Error menghapus data:', error);
      throw error;
    }
  }




module.exports = { indikator_perilaku, insertUser, updateIndikatorPerilaku, deleteIndikatorPerilaku};
