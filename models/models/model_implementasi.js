const connection = require('../db-config/connect');
const {DataTypes} = require('sequelize');
const mysql = require('mysql2/promise');

const dbConnection = connection.connect;

const list_model = dbConnection.define('list_model', {
    
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    variabel_leadership:{
        type: DataTypes.STRING
     },
    variabel_people:{
        type: DataTypes.STRING
     },
    variabel_system:{
        type: DataTypes.STRING
     }
},

{
    tableName: 'list_model',
    freezeTablename: true,
    timestamps: false
});


  // Insert dasar hukum
  const insertUser = async (variabel_leadership, variabel_people, variabel_system) => {
    try {
      const newUser = await list_model.create({variabel_leadership, variabel_people, variabel_system});
      console.log('User inserted:', newUser.toJSON());
    } catch (error) {
      console.error('Error inserting user:', error.message);
      throw error;
    }
  };

  async function updateModelImplementasi(id, newData) {
    try {
      const result = await list_model.update(newData, {
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

  async function deleteModelImplementasi(id) {
    try {
      const result = await list_model.destroy({
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




module.exports = { list_model, insertUser, updateModelImplementasi, deleteModelImplementasi};
