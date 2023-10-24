const express = require('express');
const router = express.Router();
const Admin = require('./Admin');
const bcrypt = require('bcryptjs');


router.get("/login",(req,res)=>{
    res.render("login.ejs")
});

router.post("/auth",(req,res)=>{
    let user = req.body.user;
    let senha = req.body.senha;

    Admin.findOne({where:{user:user}}).then(admin =>{
        if(admin != undefined){
            let correct = bcrypt.compareSync(senha,admin.senha);
            if(correct){
                req.session.user ={
                    id:admin.id,
                    user:admin.user
                }
                res.redirect("/admin/atletas");
            } else{
                res.redirect("/login")
            }
        } else{
            res.redirect("/login")
        }
    })
});

router.get("/logout",(req,res)=>{
    req.session.user = undefined;
    res.redirect("/");
})

module.exports = router;