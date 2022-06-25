const {check, body} = require("express-validator");
const path = require('path');
const fs = require('fs');
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
let validations = [
    check("email")
        .isEmail()
        .withMessage("Debes ingresar un email."),

    body("email").custom(value => {
        let user = users.find(element => element.email === value)

        return user?false:true;
    })
    .withMessage("Email ya registrado."),

    check("name")
        .notEmpty()
        .withMessage("Debes ingresar un nombre."),

    check("pass")
        .notEmpty()
        .withMessage("Ingresa una contraseña")
        .isLength({
            min: 6,
            max: 15
        })
        .withMessage("La contraseña debe tener entre 6 y 15 caracteres."),

]

module.exports = validations