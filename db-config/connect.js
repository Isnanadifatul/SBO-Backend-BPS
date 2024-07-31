const {Sequelize} = require('sequelize');

// database connection
const connection = new Sequelize(
  'u628390983_sbo',
  'u628390983_sbo',
  'SboBps2024',
  {
    host: 'peachpuff-tiger-800636.hostingersite.com',
    port: 3306,
    dialect: 'mysql',
  },
);

if(!connection) {
  console.log("Error")
} else{
  console.log("COnnect")
}

module.exports.connect = connection;