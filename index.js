const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const connection = require('./database/database');
const atletasController = require('./atletas/AtletasController');
const adminCotroller = require('./admin/AdminController');

const session = require('express-session');



//databases
const Dan = require('./dan/Dan');
const Atletas = require('./atletas/Atletas');
const Admin = require('./admin/Admin');


//View engine
app.set('view engine','ejs');


//sessions
app.use(session({
    secret: "aleatorio",
    cookie: {maxAge: 300000000}
}))




//Static
app.use(express.static('public'));

//BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.use("/",atletasController);
app.use("/",adminCotroller);

//database
connection
    .authenticate()
    .then(()=>{
        console.log("A conexão feita com sucesso!");
    }).catch((error)=>{
        console.log(error);
    })

app.get("/",(req,res)=>{
    res.render("index")
});

app.listen(3000,()=>{
    console.log("Servidor Rodando!");
});