const connection = require('../db-config/connect');
const {DataTypes} = require('sequelize');
const mysql = require('mysql2/promise');
const { date } = require('joi');

const dbConnection = connection.connect;

const Kandidat = dbConnection.define('Kandidat', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tahun: {
    type: DataTypes.DATE
  },
  triwulan:{
    type: DataTypes.INTEGER
  },
  nomor_kandidat: {
    type: DataTypes.STRING
  },
  nama_kandidat: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'kandidat',
  freezeTableName: true,
  timestamps: false
});

const insertUser = async (triwulan, nomor_kandidat, nama_kandidat) => {
  try {
    const newUser = await Kandidat.create({ triwulan, nomor_kandidat, nama_kandidat});
    console.log('User inserted:', newUser.toJSON());
  } catch (error) {
    console.error('Error inserting user:', error.message);
    throw error;
  }
};

async function updateKandidat(id, newData) {
  try {
    const result = await Kandidat.update(newData, {
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

const deleteKandidat = async (id) => {
  try {
    const result = await Kandidat.destroy({
      where: { id },
    });

    if (result > 0) {
      console.log(`Kandidat dengan ID ${id} berhasil dihapus.`);
      return result;
    } else {
      console.log(`Kandidat dengan ID ${id} tidak ditemukan.`);
      return null;
    }
  } catch (error) {
    console.error('Error menghapus data:', error);
    throw error;
  }
};

module.exports = { Kandidat, insertUser, updateKandidat, deleteKandidat };
