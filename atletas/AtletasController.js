const express = require('express');
const router = express.Router();
const Atletas = require('./Atletas');
const Dan = require('../dan/Dan');
const Auth = require('../middlewares/Auth')

//rota que rendeniza a pagina para cadastrar um novo atleta
router.get("/admin/novoatleta",Auth,(req,res)=>{
    Dan.findAll().then(dans =>{
        res.render("admin/novoAtleta.ejs",{dans:dans});
    })
});

//rota que salva o cadastro no banco de dados
router.post("/cadastrar/atleta",(req,res)=>{
    let nome = req.body.nome;
    let email = req.body.email;
    let cpf = req.body.cpf;
    let numcelular = req.body.numcelular;
    let nascimento = req.body.nascimento;
    let dan = req.body.dan


    function calcularIdade(dataNascimento) {
        const dataNascimentoObj = new Date(dataNascimento);
        const dataAtual = new Date();
      
        let idade = dataAtual.getFullYear() - dataNascimentoObj.getFullYear();
      
        // Verifique se o aniversário deste ano já ocorreu ou não
        const mesAtual = dataAtual.getMonth();
        const diaAtual = dataAtual.getDate();
        const mesNascimento = dataNascimentoObj.getMonth();
        const diaNascimento = dataNascimentoObj.getDate();
      
        if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
          idade--;
        }
      
        return idade;
      }

      const idade = calcularIdade(nascimento)


    Atletas.create({
        nome:nome,
        email:email,
        cpf:cpf,
        numcelular:numcelular,
        nascimento:nascimento,
        idade:idade,
        danId:dan
    }).then(()=>{
        res.redirect("/admin/atletas");
    })
});

//rota que mostra todos os atletas cadastrados
router.get("/admin/atletas",Auth,(req,res)=>{
    

    Atletas.findAll().then(atletas=>{
        res.render("admin/atletas.ejs",{atletas:atletas})
    })
});

router.get("/admin/atleta/edit/:id",Auth,(req,res)=>{
    let id = req.params.id
    if(isNaN(id)){
        return res.redirect("/admin/atletas")
    }
    Atletas.findByPk(id).then(atleta =>{
        if(atleta != undefined){
           Dan.findAll().then(dans =>{
            res.render("admin/atletaEdit.ejs",{atleta,atleta,dans:dans})
           })
        }
    })
});

router.post("/atleta/atualizar",(req,res)=>{
    let id = req.body.id;
    let nome = req.body.nome;
    let email = req.body.email;
    let cpf = req.body.cpf;
    let numcelular = req.body.numcelular;
    let nascimento = req.body.nascimento;


    function calcularIdade(dataNascimento) {
        const dataNascimentoObj = new Date(dataNascimento);
        const dataAtual = new Date();
      
        let idade = dataAtual.getFullYear() - dataNascimentoObj.getFullYear();
      
        // Verifique se o aniversário deste ano já ocorreu ou não
        const mesAtual = dataAtual.getMonth();
        const diaAtual = dataAtual.getDate();
        const mesNascimento = dataNascimentoObj.getMonth();
        const diaNascimento = dataNascimentoObj.getDate();
      
        if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
          idade--;
        }
      
        return idade;
      }

      const idade = calcularIdade(nascimento)

      Atletas.update({
        nome:nome,
        email:email,
        cpf:cpf,
        numcelular:numcelular,
        nascimento:nascimento,
        idade:idade

      },{where:{id:id}}).then(()=>{
        res.redirect("/admin/atletas")
      })
});

router.post("/atleta/deletar",(req,res)=>{
    let id = req.body.id;

    if(id != undefined){
        if(!isNaN(id)){
            Atletas.destroy({
                where:{
                    id:id
                }
            }).then(()=>{
                res.redirect("/admin/atletas");
            })
        } else{
            res.redirect("/admin/atletas");
        }
    } else{
        res.redirect("/admin/atletas");
    }
});

router.get("/admin/atleta/perfil/:id",Auth,(req,res)=>{
    let id = req.params.id;

    Atletas.findOne({
        where:{
            id:id
        }
    }).then(atleta=>{
        if(atleta != undefined){
            Dan.findOne({
                where:{
                    id: atleta.danId
                }
            }).then(dan =>{
                let data = atleta.nascimento;
                data.setDate(data.getDate()+1);
                let dataNascimento = new Date(data)
                res.render("admin/perfil.ejs",{atleta:atleta,dan:dan,dataNascimento:dataNascimento})
            })
        } else{
            res.redirect("/admin/atletas")
        }
    })
})


module.exports = router;