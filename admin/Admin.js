const Sequelize = require('sequelize');
const connection = require('../database/database');
const bcrypt = require('bcryptjs');

const Admin = connection.define('admins',{
    user:{
        type: Sequelize.STRING,
        allowNull: false
    },
    senha:{
        type: Sequelize.STRING,
        allowNull: false
    }    
});

//criando admin
// let senha = ('1234');
// let salt = bcrypt.genSaltSync(10);
// let hash = bcrypt.hashSync(senha,salt);


// Admin.create({
//     user:'jpyk',
//     senha:hash
// })

// Admin.sync({force:true});

module.exports = Admin;
