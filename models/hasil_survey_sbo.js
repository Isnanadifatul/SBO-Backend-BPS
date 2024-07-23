const connection = require('../db-config/connect');
const {DataTypes} = require('sequelize');
const mysql = require('mysql2/promise');

const dbConnection = connection.connect;

// create database using models
const hasil_survey_priker = dbConnection.define('hasil_survey_priker', {
  id_hasil_priker: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_pertanyaan: {
    type: DataTypes.INTEGER,
    references: {
      model: 'pertanyaan_perilaku',
      key: 'id_pertanyaan',
    },
  },
  x: {
    type: DataTypes.STRING,
  },
  y: {
    type: DataTypes.STRING,
  },
  tahun: {
    type: DataTypes.INTEGER,
  },
  triwulan: {
    type: DataTypes.INTEGER,
  },
}, 
{
  tableName: "hasil_survey_priker",
  freezeTableName: true,
  timestamps: false
});

const hasil_survey_leadbo = dbConnection.define('hasil_survey_leadbo', {
  id_hasil_leadbo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_pertanyaan : {
    type: DataTypes.INTEGER,
    references: {
      model: 'pertanyaan_leadership',
      key: 'id_pertanyaan'
    }
  },
  x: {
    type: DataTypes.STRING,
  },
  y: {
    type: DataTypes.STRING,
  },
  tahun: {
    type: DataTypes.INTEGER,
  },
  triwulan: {
    type: DataTypes.INTEGER,
  },
}, 
{
  tableName: "hasil_survey_leadbo",
  freezeTableName: true,
  timestamps: false
});

const hasil_survey_pebo = dbConnection.define('hasil_survey_pebo', {
  id_hasil_pebo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_pertanyaan: {
    type: DataTypes.INTEGER,
    references: {
      model: 'pertanyaan_people',
      key: 'id_pertanyaan'
    }
  },
  x: {
    type: DataTypes.STRING,
  },
  y: {
    type: DataTypes.STRING,
  },
  tahun: {
    type: DataTypes.INTEGER,
  },
  triwulan: {
    type: DataTypes.INTEGER,
  },
}, 
{
  tableName: "hasil_survey_pebo",
  freezeTableName: true,
  timestamps: false
});

const hasil_survey_sysbo = dbConnection.define('hasil_survey_sysbo', {
  id_hasil_sysbo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_pertanyaan: {
    type: DataTypes.INTEGER,
    references: {
      model: 'pertanyaan_system',
      key: 'id_pertanyaan'
    } 
  },
  x: {
    type: DataTypes.STRING,
  },
  y: {
    type: DataTypes.STRING,
  },
  tahun: {
    type: DataTypes.INTEGER,
  },
  triwulan: {
    type: DataTypes.INTEGER,
  },
}, 
{
  tableName: "hasil_survey_sysbo",
  freezeTableName: true,
  timestamps: false
});

  
module.exports = {hasil_survey_priker, hasil_survey_leadbo, hasil_survey_pebo, hasil_survey_sysbo};
