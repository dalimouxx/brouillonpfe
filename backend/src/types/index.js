const Enseignant = {
    IdEnseignant: "",
    nomEnseignant: "",
    prenomEnseignant: "",
    sexeEnseignant: "", // Devrait être 'homme' ou 'femme'
    email: "",
    motDePasse: "",
    Region: "", // Devrait être une région spécifique parmi celles mentionnées
    imgEns: "",
    Diplome: "",
    Nomination: new Date(), 
    grade: "",
    idInspecteur: ""
};
var Student = function(student){
    this.first_name     = student.first_name;
    this.last_name      = student.last_name;
    this.email          = student.email;
    this.phone          = student.phone;
    this.class         = student.class;

  
};