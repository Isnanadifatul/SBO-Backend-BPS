const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../db-config/connect');
const dbConnection = connection.connect;

const konversi = dbConnection.define('nilai_konversi_survey', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama_kandidat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nilai_konversi: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'nilai_konversi_survey',
    timestamps: false
});

const nilai_tambah = dbConnection.define('nilai_tambah', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama_kandidat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nilai_kip_app: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    nilai_presensi: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'nilai_tambah',
    timestamps: false
});

// Defining associations
konversi.hasMany(nilai_tambah, { foreignKey: 'nama_kandidat', sourceKey: 'nama_kandidat' });
nilai_tambah.belongsTo(konversi, { foreignKey: 'nama_kandidat', targetKey: 'nama_kandidat' });

module.exports = {
    konversi,
    nilai_tambah
};