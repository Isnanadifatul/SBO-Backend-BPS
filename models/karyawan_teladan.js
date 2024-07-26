const connection = require('../db-config/connect');
// const {DataTypes} = require('sequelize');
const mysql = require('mysql2/promise');

const { Sequelize, DataTypes } = require('sequelize');
const { nilai_tambah } = require('./nilai_tambah');
const { allow } = require('joi');

const dbConnection = new Sequelize('sbo', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const survey_pegawai_teladan = dbConnection.define('survey_pegawai_teladan', {
    
    id_survey_p:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nip:{
        type: DataTypes.INTEGER,
     },
    nama_lengkap:{
        type: DataTypes.STRING
     },
    jenis_kelamin:{
        type: DataTypes.STRING
     },
    umur:{
        type: DataTypes.INTEGER
     },
    pendidikan:{
        type: DataTypes.STRING
     },
    masa_kerja:{
        type: DataTypes.STRING
     },
    nomor_kandidat:{
        type: DataTypes.STRING
     },
    nama_kandidat:{
        type: DataTypes.STRING
     },
    pertanyaan_1:{
        type: DataTypes.INTEGER
     },
    pertanyaan_2:{
        type: DataTypes.INTEGER
     },
    pertanyaan_3:{
        type: DataTypes.INTEGER
     },
    pertanyaan_4:{
        type: DataTypes.INTEGER
     },
    pertanyaan_5:{
        type: DataTypes.INTEGER
     },
    pertanyaan_6:{
        type: DataTypes.INTEGER
     },
    pertanyaan_7:{
        type: DataTypes.INTEGER
     },
    pertanyaan_8:{
        type: DataTypes.INTEGER
     },
    pertanyaan_9:{
        type: DataTypes.INTEGER
     },
    pertanyaan_10:{
        type: DataTypes.INTEGER
     },
    pertanyaan_11:{
        type: DataTypes.INTEGER
     },
    pertanyaan_12:{
        type: DataTypes.INTEGER
     },
    pertanyaan_13:{
        type: DataTypes.INTEGER
     },
    pertanyaan_14:{
        type: DataTypes.INTEGER
     },
    pertanyaan_15:{
        type: DataTypes.INTEGER
     },
    pertanyaan_16:{
        type: DataTypes.INTEGER
     },
    pertanyaan_17:{
        type: DataTypes.INTEGER
     },
    pertanyaan_18:{
        type: DataTypes.INTEGER
     },
    pertanyaan_19:{
        type: DataTypes.INTEGER
     },
    pertanyaan_20:{
        type: DataTypes.INTEGER
     },
    pertanyaan_21:{
        type: DataTypes.INTEGER
     },
},

{
    tableName: 'survey_pegawai_teladan',
    timestamps: false
});

const konversi = dbConnection.define('konversi', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nomor_kandidat : {
        type: DataTypes.STRING,
        allowNull: false
    },
    nama_kandidat : {
        type: DataTypes.STRING,
        allowNull: false
    },
    nilai_konversi: {
        type: DataTypes.FLOAT,
        allowNull:false
    }
}, {
    tableName: 'nilai_konversi_survey',
    timestamps: false 
})


const saveKonversi = async (nomor_kandidat, nama_kandidat, nilai_konversi) => {
    try {
        const newResponse = await konversi.create({ nomor_kandidat, nama_kandidat, nilai_konversi });
        console.log('Response berhasil disimpan:', newResponse.toJSON());
    } catch (error) {
        console.error('Gagal menyimpan response:', error.message);
        throw error;
    }
};

  // Insert nilai survey
  const insertUser = async (nama_lengkap,nip, jenis_kelamin, umur, pendidikan, masa_kerja, nomor_kandidat, nama_kandidat,
        pertanyaan_1, pertanyaan_2, pertanyaan_3, pertanyaan_4, pertanyaan_5, 
        pertanyaan_6, pertanyaan_7, pertanyaan_8, pertanyaan_9, pertanyaan_10,
        pertanyaan_11, pertanyaan_12, pertanyaan_13, pertanyaan_14, pertanyaan_15,
        pertanyaan_16, pertanyaan_17, pertanyaan_18, pertanyaan_19, pertanyaan_20,
        pertanyaan_21) => {
    try {
      const newUser = await survey_pegawai_teladan.create({nama_lengkap, nip,  jenis_kelamin, umur, pendidikan, masa_kerja, nomor_kandidat, nama_kandidat,
        pertanyaan_1, pertanyaan_2, pertanyaan_3, pertanyaan_4, pertanyaan_5, 
        pertanyaan_6, pertanyaan_7, pertanyaan_8, pertanyaan_9, pertanyaan_10,
        pertanyaan_11, pertanyaan_12, pertanyaan_13, pertanyaan_14, pertanyaan_15,
        pertanyaan_16, pertanyaan_17, pertanyaan_18, pertanyaan_19, pertanyaan_20,
        pertanyaan_21});
      console.log('Survey inserted:', newUser.toJSON());
    } catch (error) {
      console.error('Error inserting survey:', error.message);
      throw error;
    }
  };

module.exports = {  survey_pegawai_teladan,
                    insertUser, 
                    dbConnection,
                    konversi,
                    saveKonversi
                    };