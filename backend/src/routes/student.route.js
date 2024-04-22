const express = require('express')
const router = express.Router()
const studentController = require('../controllers/student.controller');


router.get('/findall', studentController.findAll);


router.post('/create', studentController.create);


router.get('/fid/:id', studentController.findById);


router.put('/update/:id', studentController.update);


router.delete('/delete/:id', studentController.delete);

module.exports = router