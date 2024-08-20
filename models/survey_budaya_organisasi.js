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
  label: {
    type:DataTypes.STRING,
    unique: false,
  },
  triwulan: {
    type: DataTypes.INTEGER,
  },
  tahun: {
    type: DataTypes.INTEGER,
  },
  nama: {
    type: DataTypes.STRING,
  },
  score_harapan: {
    type: DataTypes.JSON,
  },
  score_kinerja: {
    type: DataTypes.JSON,
  }
  
}, 
{
  tableName: "survey_budaya_organisasi",
  freezeTableName: true,
  timestamps: false
});

module.exports = { survey_budaya_organisasi };
