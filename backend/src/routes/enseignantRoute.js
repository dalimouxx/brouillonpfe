const express = require('express')
const router = express.Router()
const enseignantControllers = require('../controllers/enseignantControllers');


router.get('/getAllEns', enseignantControllers.getAll);


router.post('/createEns', enseignantControllers.create);


router.get('/gid/:id', enseignantControllers.getById);


router.put('/update/:id', enseignantControllers.update);


router.delete('/delete/:id', enseignantControllers.delete);

module.exports = router