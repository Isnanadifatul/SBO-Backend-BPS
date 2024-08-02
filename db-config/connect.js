const {Sequelize} = require('sequelize');

// database connection
const connection = new Sequelize(
  'sbo',
  'root',
  '',
  {
    host: 'localhost',
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