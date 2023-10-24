const Sequelize = require('sequelize');
const connection = new Sequelize('Nome do banco','nome de usuario','senha',{
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = connection;