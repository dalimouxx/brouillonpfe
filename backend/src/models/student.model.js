
var dbConn = require('../../config/db');


var Student = function(student){
    this.first_name     = student.first_name;
    this.last_name      = student.last_name;
    this.email          = student.email;
    this.phone          = student.phone;
    this.class         = student.class;

  
};
Student.create = function (newStu, result) {    
    dbConn.query("INSERT INTO students set ?", newStu, function (err, res) {
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
Student.findById = function (id, result) {
    dbConn.query("Select * from students where id = ? ", id, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};
Student.findAll = function (result) {
    dbConn.query("Select * from students", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('students : ', res);  
            result(null, res);
        }
    });   
};
Student.update = function(id, student, result){
  dbConn.query("UPDATE students SET first_name=?,last_name=?,email=?,phone=?,class=? WHERE id = ?", [student.first_name,student.last_name,student.email,student.phone,student.class, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};
Student.delete = function(id, result){
     dbConn.query("DELETE FROM students WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

module.exports= Student;