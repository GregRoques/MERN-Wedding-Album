const { databasePassword, databaseName } = require("./passwords/db_pw");
const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: databaseName,
  password: databasePassword,
});

module.exports = pool.promise();
