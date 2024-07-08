const connection = require('../db-config/connect');
const {DataTypes} = require('sequelize');
const mysql = require('mysql2/promise');

const dbConnection = connection.connect;

const indikator_people = dbConnection.define('indikator_people', {
    
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
    freezeTablename: true,
    timestamps: false
});


  // Insert Indikator people
  const insertUser = async (no, indikator) => {
    try {
      const newUser = await indikator_people.create({ no, indikator});
      console.log('User inserted:', newUser.toJSON());
    } catch (error) {
      console.error('Error inserting user:', error.message);
      throw error;
    }
  };

  async function updateIndikatorPeople(id, newData) {
    try {
      const result = await indikator_people.update(newData, {
        where: { id: id },
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

  async function deleteIndikatorPeople(id) {
    try {
      const result = await indikator_people.destroy({
        where: {id},
      });
  
      if (result > 0) {
        console.log(`Indikator People dengan ID ${id} berhasil dihapus.`);
        return result;
      } else {
        console.log(`Indikator People dengan ID ${id} tidak ditemukan.`);
        return null;
      }
    } catch (error) {
      console.error('Error menghapus data:', error);
      throw error;
    }
  }




module.exports = { indikator_people, insertUser, updateIndikatorPeople, deleteIndikatorPeople};