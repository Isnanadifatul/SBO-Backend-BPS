const {Sequelize} = require('sequelize');

// database connection
const connection = new Sequelize(
  'umkmpal1_aang',
  'umkmpal1_aang',
  'Aang2024_',
  {
    host: 'umkmpalangan.my.id',
    port: 3306,
    dialect: 'mysql',
  },
);

if(!connection) {
  console.log("Error")
} else{
  console.log("Connect")
}

module.exports.connect = connection;