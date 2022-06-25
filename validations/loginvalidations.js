const {check, body} = require("express-validator");
const path = require('path');
const fs = require('fs');
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const bcrypt = require("bcryptjs");

let validations = [
    check("email")
        .isEmail()
        .withMessage("Debes ingresar un mail válido."),

    body("email").custom( value => {
        let user = users.find(element => element.email === value);
        return user?true:false;
    })
    .withMessage("Este email no está registrado."),
    
    body("password", "Las contraseñas no coinciden").custom((value, {req}) => {
        let user = users.find(element => element.email === req.body.email);
        console.log("validator: " + user.email);
        console.log(bcrypt.compareSync(req.body.password, user.password));
        if(!bcrypt.compareSync(req.body.password, user.password)){
            return false;
        };
        return true;
    })
]

module.exports = validations;