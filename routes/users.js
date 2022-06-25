var express = require('express');
var router = express.Router();
const uploadFiles = require('../middlewares/uploadProductFiles') //Requerimos el middleware que tiene la configuracion de multer
const mainController = require ('../controllers/mainController')
const controller = require ('../controllers/productsController')
const loginValidator = require('../validations/loginValidations');
const registerValidator = require('../validations/registervalidation');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/', controller.index);

router.get('/login', mainController.login);
router.post('/login', loginValidator, mainController.loginProcess);
router.get('/register', mainController.register);
router.post('/register', uploadFiles.any(), registerValidator, mainController.store);

module.exports = router;
