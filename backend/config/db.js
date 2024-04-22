const mysql=require('mysql')
const db = mysql.createPool({
host: "localhost",
user:"root",
password:"",
database:"pfe"
});
db.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to database successfully');
    connection.release(); // Release the connection when done
  });
module.exports = db