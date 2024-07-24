var mysql = require('mysql');

const connection = mysql.createConnection({
    connectionLimit: 10,
    host: process.env.PORT|| 'localhost',
    user: 'root',
    password: 'raj@321',
    database: 'feedfrenzy',
    insecureAuth: true
  })
  
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      return;
    }
    console.log('Connected to the database as id ' + connection.threadId);
  });
module.exports = connection;