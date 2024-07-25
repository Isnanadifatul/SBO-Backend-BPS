const connection = require('../db-config/connect');
const {DataTypes} = require('sequelize');
const mysql = require('mysql2/promise');
const dbConnection = connection.connect;

const { pertanyaan_perilaku } = require('./pertanyaan_perilaku');
const { pertanyaan_lead } = require('./pertanyaan_lead');
const { pertanyaan_peop } = require('./pertanyaan_people');
const { pertanyaan_sys } = require('./pertanyaan_system');

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
      model: 'pertanyaan_lead',
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
      model: 'pertanyaan_peop',
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
      model: 'pertanyaan_sys',
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
/*
hasil_survey_priker.belongsTo(pertanyaan_perilaku, { foreignKey: 'id_pertanyaan' });
hasil_survey_leadbo.belongsTo(pertanyaan_lead, { foreignKey: 'id_pertanyaan' });
hasil_survey_pebo.belongsTo(pertanyaan_peop, { foreignKey: 'id_pertanyaan' });
hasil_survey_sysbo.belongsTo(pertanyaan_sys, { foreignKey: 'id_pertanyaan' });

*/
module.exports = {hasil_survey_priker, hasil_survey_leadbo, hasil_survey_pebo, hasil_survey_sysbo};
