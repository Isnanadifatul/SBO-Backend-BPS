const connection = require('../db-config/connect');
const {DataTypes} = require('sequelize');
const mysql = require('mysql2/promise');

const dbConnection = connection.connect;

const indikator_system = dbConnection.define('indikator_system', {
    
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
    tableName: 'indikator_system',
    freezeTablename: true,
    timestamps: false
});


  // Insert Indikator people
  const insertUser = async (no, indikator) => {
    try {
      const newUser = await indikator_system.create({no, indikator});
      console.log('User inserted:', newUser.toJSON());
    } catch (error) {
      console.error('Error inserting user:', error.message);
      throw error;
    }
  };

  async function updateIndikatorSystem(id, newData) {
    try {
      const result = await indikator_system.update(newData, {
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

  async function deleteIndikatorSystem(id) {
    try {
      const result = await indikator_system.destroy({
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




module.exports = { indikator_system, insertUser, updateIndikatorSystem, deleteIndikatorSystem};
