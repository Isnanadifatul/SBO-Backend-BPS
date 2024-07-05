const bcrypt = require('bcrypt');
const connection = require('../db-config/connect');
const { DataTypes } = require('sequelize');
const mysql = require('mysql2/promise');

const dbConnection = connection.connect;

// create database using models
const survey_budaya_organisasi = dbConnection.define('survey_budaya_organisasi', {
  id_survey_b: {
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
  id_pertanyaan_b: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'pertanyaan_leadership',
        key: 'id_pertanyaan'
    }
  },
  nama: {
    type: DataTypes.STRING,
  },
  jenis_kelamin: {
    type: DataTypes.STRING,
  },
  umur: {
    type: DataTypes.INTEGER,
  },
  pendidikan: {
    type: DataTypes.STRING,
  },
  masa_kerja: {
    type: DataTypes.STRING,
  },
  score_harapan: {
    type : DataTypes.INTEGER,
  },
  score_kinerja: {
    type: DataTypes.INTEGER,
  },
  hasil: {
    type: DataTypes.INTEGER,
  }
  
}, 
{
  tableName: "survey_budaya_organisasi",
  freezeTableName: true,
  timestamps: false
});

module.exports = {survey_budaya_organisasi};
