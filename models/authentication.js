const bcrypt = require('bcrypt');
const connection = require('../db-config/connect');
const { Sequelize, DataTypes } = require('sequelize');
const mysql = require('mysql2/promise');
const dbConnection = connection.connect;


// create database using models
const Authentication = dbConnection.define('Authentication', {
  id_auth: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nip: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'pegawai',
      key: 'nip'
    }
  },
  role: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  confirmasi_password: {
    type: DataTypes.STRING,
  },
}, 
{
  tableName: "authentication",
  freezeTableName: true,
  timestamps: false
});
/*
// Sinkronisasi Model dengan Database
dbConnection.sync({ alter: true })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((error) => {
    console.error('Unable to create table : ', error);
  });
*/
// Insert Authentication
const insertUser = async (role, hashedPassword, confirmasi_password, nip) => {
  try {
    const newUser = await Authentication.create({role, password: hashedPassword, confirmasi_password, nip});
    console.log('User inserted:', newUser.toJSON());
  } catch (error) {
    console.error('Error inserting user:', error.message);
    throw error;
  }
};

// Fungsi untuk meng-update data authentication
async function updateAuthenticationById(id, newData) {
  try {
    // Cek apakah ada field password yang di-update
    if (newData.password) {
      // Hash password baru
      const hashedPassword = await bcrypt.hash(newData.password, 10);
      newData.password = hashedPassword;
    }

    // Lakukan update
    const result = await Authentication.update(newData, {
      where: { nip: id },
    });

    if (result[0] > 0) {
      console.log(`Data Authentication dengan NIP ${id} berhasil diupdate.`);
      return result;
    } else {
      console.log(`Data Authentication dengan NIP ${id} tidak ditemukan.`);
      return null;
    }
  } catch (error) {
    console.error('Error mengupdate data Authentication:', error);
    throw error;
  }
}

module.exports = { Authentication, insertUser, updateAuthenticationById };
