const { func } = require('joi');
const connection = require('../db-config/connect');
const {Sequelize, DataTypes} = require ('sequelize');

const dbConnection = connection.connect;

const nilai_tambah = dbConnection.define('nilai_tambah', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nomor_kandidat:{
        type: DataTypes.STRING
    },
    nama_kandidat:{
        type: DataTypes.STRING
    },
    nilai_kip_app:{
        type: DataTypes.FLOAT
    },
    nilai_presensi:{
        type: DataTypes.FLOAT
    },
},
{
    tableName: 'nilai_tambah',
    freezeTableName: true,
    timestamps: false
});


//insert nilai tambah

const insert = async (nomor_kandidat, nama_kandidat, nilai_kip_app, nilai_presensi) => {
    try {
        const newUser = await nilai_tambah.create({nomor_kandidat, nama_kandidat, nilai_kip_app, nilai_presensi});
        console.log('Nilai berhasil diinput', newUser.toJSON());
    }catch (error) {
        console.error('Input data error guys!!:', error.message);
        throw error;
      }
};


async function updateNilaiTambah(id, newData) {
    try {
        const result = await nilai_tambah.update(newData, {
            where: {id},
        });

        if (result[0] > 0) {
            console.log(`Nilai tambah dengan id ${id} berhasil diupdate`);
            return result;
        } else {
            console.log('Data gagal diupdate guys');
            return null;
        }
    } catch (error) {
        console.error('Error Guyss!', error);
        throw error;
    }
};

async function deleteNilaiTambah(id) {
    try {
        const result = await nilai_tambah.destroy({
            where: {id},
        });

        if (result > 0) {
            console.log('Nilai berhasil dihapus');
            return result;
        } else {
            console.log(`Nilai dengan ID ${id} tidak ditemukan`);
            return null;
        }
    } catch (error) {
        console.error(' Error menghapus data', error);
        throw error;
    }
};

module.exports = {
    insert,
    updateNilaiTambah,
    deleteNilaiTambah,
    nilai_tambah
}
