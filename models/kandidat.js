const connection = require('../db-config/connect');
const {DataTypes} = require('sequelize');
const mysql = require('mysql2/promise');

const dbConnection = connection.connect;

const Kandidat = dbConnection.define('Kandidat', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nomor_kandidat: {
    type: DataTypes.STRING
  },
  nama_kandidat: {
    type: DataTypes.STRING
  },
  foto: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'kandidat',
  freezeTableName: true,
  timestamps: false
});

const insertKandidat = async (nomor_kandidat, nama_kandidat, foto) => {
  try {
    const newKandidat = await Kandidat.create({ nomor_kandidat, nama_kandidat, foto });
    console.log('Kandidat inserted:', newKandidat.toJSON());
    return newKandidat;
  } catch (error) {
    console.error('Error inserting kandidat:', error.message);
    throw error;
  }
};

const updateKandidat = async (id, newData) => {
  try {
    const result = await Kandidat.update(newData, {
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
};

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

module.exports = { Kandidat, insertKandidat, updateKandidat, deleteKandidat };
