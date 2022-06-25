const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
//const several = products.filter(product => product.category == 'varios');
//const unique = products.filter(product => product.category == 'unico');

//const { data, writeDataJSON } = require('../data/users.json');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const mainController = {
    index: (req, res) => {
        res.render("index", { products })
    },

    login : (req, res) => {
        res.render("login")
    },

    loginProcess: (req, res)=> {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            try {
                let user = users.find(element => element.email === req.body.email);
                req.session.user = {
                    password: user.password,
                    email: user.email,
                    //rol: user.rol
                };
                req.session.email = user.email;
                res.cookie("cookieSession", req.session.user, {
                    expires: new Date(Date.now() + 9000000),
                    httpOnly: true,
                    secure: true
                });

                //res.locals.user = req.session.user;
                res.redirect("/")
                
            } catch (error) {
                res.send(error)
            }
        }else {
            res.send(errors);
        }
    },

    register: (req, res) => { //Solo necesitamos pasarle la vista renderizada para que la rellene, es por get
        res.render("register")
    },

    store: (req, res) => {
        /***********************PARA LAS IMAGENES ***********************/
        let image
        let pass
       

        if (req.files[0] != undefined) {
            image = req.files[0].filename
        } else {
            image = "default-image.png"
        }
        /********************************************************** */
       
        let newUsers = {
           
            id: users[users.length - 1].id + 1,
            password: bcrypt.hashSync(pass, 8),
            ...req.body,
            image: image //PARA LAS IMAGENES
        }
        users.push(newUsers);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ''));
        res.redirect('/');

    },
}


module.exports = mainController





   
   

    
