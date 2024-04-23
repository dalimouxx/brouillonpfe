
const Enseignant = require('../models/enseignantModel');

exports.getAll = function(req, res) {
  Enseignant.getAll(function(err, Enseignant) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', Enseignant);
    res.send(Enseignant);
  });
};



exports.getById = function(req, res) {
    Enseignant.getById(req.params.id, function(err, Enseignant) {
        if (err)
        res.send(err);
        res.json(Enseignant);
    });
};

exports.create = function(req, res) {
    const new_enseigant = new Enseignant(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Enseignant.create(new_enseignant, function(err, Enseignant) {
            if (err)
            res.send(err);
            res.json({error:false,message:"Enseignant added successfully!",data:Enseignant});
        });
    }
};



exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Enseignant.update(req.params.id, new Enseignant(req.body), function(err, Enseignant) {
            if (err)
            res.send(err);
            res.json({ error:false, message: 'Enseignant successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
Enseignant.delete( req.params.id, function(err,Enseignant) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Enseignant successfully deleted' });
  });
};