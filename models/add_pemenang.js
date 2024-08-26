const { DataTypes } = require('sequelize');
const connection = require('../db-config/connect');

const dbConnection = connection.connect;


const Survey = dbConnection.define('Survey', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    tahun: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    triwulan: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    foto: {
        type: DataTypes.BLOB('long'),
        allowNull: true,
    },
}, {
    tableName: 'karyawan_teladan',
    timestamps: false,
});

module.exports = Survey;
