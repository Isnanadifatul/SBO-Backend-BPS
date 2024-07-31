const connection = require('../db-config/connect');
const mysql = require('mysql2/promise');

const { Sequelize, DataTypes } = require('sequelize');

const dbConnection = new Sequelize('sbo', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const pemenangSPT = dbConnection.define('pemenang_survey_pegawai_teladan', {
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
    nilai: {
        type: DataTypes.FLOAT,
        allowNull:false
    }
}, {
    tableName: 'pemenang_survey_pegawai_teladan',
    timestamps: false 
})


const saveTopCandidates = async (tahun, triwulan, nomor_kandidat, nama_kandidat, result_scores) => {
    const query = `
        INSERT INTO pemenang_survey_pegawai_teladan (tahun, triwulan, nomor_kandidat, nama_kandidat, nilai)
        VALUES (:tahun, :triwulan, :nomor_kandidat, :nama_kandidat, :nilai)
        ON DUPLICATE KEY UPDATE
        nilai = VALUES(nilai);
    `;

    try {
        await dbConnection.query(query, {
            replacements: {
                tahun,
                triwulan,
                nomor_kandidat,
                nama_kandidat,
                nilai: result_scores
            },
            type: Sequelize.QueryTypes.INSERT
        });
        console.log('Data inserted/updated successfully');
    } catch (error) {
        console.error('Error inserting/updating data:', error);
    }
};

module.exports = {
    pemenangSPT,
    saveTopCandidates
}