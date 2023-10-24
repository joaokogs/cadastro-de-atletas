const {Sequelize, DataTypes} = require('sequelize');
const connection = require('../database/database');
const Dan = require('../dan/Dan');


const Atletas = connection.define('atletas',{
    nome:{
        type: Sequelize.STRING,
        allowNull:false
    },
    email:{
        type: Sequelize.STRING,
        allowNull:false,
        unique: true,
    },
    cpf:{
        type: Sequelize.STRING,
        allowNull: false, 
        unique: true,
    }, 
    numcelular:{
        type: Sequelize.STRING, 
        allowNull: false,
        unique: true,
    },
    nascimento:{
        type: DataTypes.DATE, 
        allowNull: false,
    },
    idade:{
        type: Sequelize.INTEGER,
        allowNull:false
    }
});

Dan.hasMany(Atletas);

Atletas.belongsTo(Dan)


  
//Descomentar se para criar a table
// Atletas.sync({force:true});


module.exports = Atletas;