const connection = require('../db-config/connect');
const mysql = require('mysql2/promise');

const { Sequelize, DataTypes } = require('sequelize');

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
    tahun:{
        type: DataTypes.DATE
    },
    triwulan:{
        type: DataTypes.INTEGER
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
    tahun:{
        type: DataTypes.DATE,
    },
    triwulan:{
        type: DataTypes.INTEGER,
        allowNull: false
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


const saveKonversi = async (tahun, triwulan, nomor_kandidat, nama_kandidat, avg_total_hasil_30_percent) => {
    const query = `
        INSERT INTO nilai_konversi_survey (tahun, triwulan, nomor_kandidat, nama_kandidat, nilai_konversi)
        VALUES (:tahun, :triwulan, :nomor_kandidat, :nama_kandidat, :nilai_konversi)
        ON DUPLICATE KEY UPDATE
        nilai_konversi = VALUES(nilai_konversi);
    `;

    try {
        await dbConnection.query(query, {
            replacements: {
                tahun,
                triwulan,
                nomor_kandidat,
                nama_kandidat,
                nilai_konversi: avg_total_hasil_30_percent
            },
            type: Sequelize.QueryTypes.INSERT
        });
        console.log('Data inserted/updated successfully');
    } catch (error) {
        console.error('Error inserting/updating data:', error);
    }
};

  // Insert nilai survey
  const insertUser = async (triwulan, nama_lengkap, nip, jenis_kelamin, umur, pendidikan, masa_kerja, nomor_kandidat, nama_kandidat,
        pertanyaan_1, pertanyaan_2, pertanyaan_3, pertanyaan_4, pertanyaan_5, 
        pertanyaan_6, pertanyaan_7, pertanyaan_8, pertanyaan_9, pertanyaan_10,
        pertanyaan_11, pertanyaan_12, pertanyaan_13, pertanyaan_14, pertanyaan_15,
        pertanyaan_16, pertanyaan_17, pertanyaan_18, pertanyaan_19, pertanyaan_20,
        pertanyaan_21) => {
    try {
      const newUser = await survey_pegawai_teladan.create({triwulan, nama_lengkap, nip, jenis_kelamin, umur, pendidikan, masa_kerja, nomor_kandidat, nama_kandidat,
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