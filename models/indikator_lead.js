const connection = require('../db-config/connect');
const {DataTypes} = require('sequelize');
const mysql = require('mysql2/promise');
//const { id } = require('@hapi/joi/lib/base');

const dbConnection = connection.connect;

const indikator_leadership = dbConnection.define('indikator_leadership', {
    
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoiIcrement: true
    },
    no:{
        type: DataTypes.INTEGER
     },
    indikator:{
        type: DataTypes.STRING
     }
},

{   
    tableName: 'indikator_leadership',
    freezeTablename: true,
    timestamps: false
});


  // Insert Indikator people
  const insertUser = async (no, indikator) => {
    try {
      const newUser = await indikator_leadership.create({ no, indikator});
      console.log('User inserted:', newUser.toJSON());
    } catch (error) {
      console.error('Error inserting user:', error.message);
      throw error;
    }
  };

  async function updateIndikatorLead(id, newData) {
    try {
      const result = await indikator_leadership.update(newData, {
        where: { id },
      });
  
      if (result[0] > 0) {
        console.log(`Data dengan ID ${id} berhasil diupdate.`);
        return result;
      } else {
        console.log(`Data dengan ID ${id} tidak ditemukan.`);
        return null;
      }
    } catch (error) {
      console.error('Error mengupdate data:', error);
      throw error;
    }
  }

  async function deleteIndikatorLead(id) {
    try {
      const result = await indikator_leadership.destroy({
        where: { id:id },
      });
  
      if (result > 0) {
        console.log(`Indikator dengan ID ${id} berhasil dihapus.`);
        return result;
      } else {
        console.log(`Indikator dengan ID ${id} tidak ditemukan.`);
        return null;
      }
    } catch (error) {
      console.error('Error menghapus data:', error);
      throw error;
    }
  }




module.exports = { indikator_leadership, insertUser, updateIndikatorLead, deleteIndikatorLead};
