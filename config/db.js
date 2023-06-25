const mysql = require("mysql");
const connect = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "valorant_players",
  charset: "utf8mb4",
  timezone: "+07:00",
});

connect.getConnection((err) => {
  if (err) throw err;
  console.log("DB is now connected :D");
});

module.exports = connect;
