var dbConn = require('../../config/db');

var Enseignant = function(enseignant) {
    this.IdEnseignant = enseignant.IdEnseignant;
    this.nomEnseignant = enseignant.nomEnseignant;
    this.prenomEnseignant = enseignant.prenomEnseignant;
    this.sexeEnseignant = enseignant.sexeEnseignant;
    this.email = enseignant.email;
    this.motDePasse = enseignant.motDePasse;
    this.Region = enseignant.Region;
    this.imgEns = enseignant.imgEns;
    this.Diplome = enseignant.Diplome;
    this.Nomination = enseignant.Nomination;
    this.grade = enseignant.grade;
    this.idInspecteur = enseignant.idInspecteur;
};


Enseignant.getAll = function (result) {
    dbConn.query("Select * from enseignant", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('enseignant : ', res);  
            result(null, res);
        }
    });   
};

Enseignant.getById = function (id, result) {
    dbConn.query("Select * from enseignant where id = ? ", id, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

Enseignant.create = function (newStu, result) {    
    dbConn.query("INSERT INTO enseignant set ?", newStu, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });           
};

Enseignant.update = function(id, Enseignant, result){
  dbConn.query("UPDATE enseignant SET nomEnseignant=?,prenomEnseignant=?, email=?, phone=?, grade=? WHERE idEnseignant = ?", 
  [Enseignant.last_name, Enseignant.first_name, Enseignant.email, Enseignant.phone, Enseignant.class, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};
Enseignant.delete = function(id, result){
     dbConn.query("DELETE FROM enseignant WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

module.exports= Enseignant;