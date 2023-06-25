const express = require("express");
const app = express();
const connection = require("./config/db");

app.use(express.json());

//HERONHOGA

//GET ALL PLAYERS DATA
app.get("/get-players", function (req, res) {
  const queryFind = "SELECT * FROM `player_data`";
  connection.query(queryFind, (err, result) => {
    if (err) {
      console.log("error");
      res.error(err.sqlMessage, res);
    } else {
      res.status(200).json({
        success: true,
        message: "Success",
        data: result,
      });
    }
  });
});
//END GET

//POST NEW PLAYER DATA
app.post("/store-player", function (req, res) {
  console.log(req.body);
  const param = req.body;
  const name = param.name;
  const age = param.age;
  const team = param.team;
  const role = param.role;

  const queryStore = "INSERT INTO `player_data` (name, age, team, role) VALUES (?,?,?,?)";
  const values = [name, age, team, role];

  connection.query(queryStore, values, (err, result) => {
    if (err) {
      console.log("error");
      res.status(500).json({
        succes: false,
        message: "Failed",
        data: null,
      });
    } else {
      res.status(200).json({
        succes: true,
        message: "Success",
        data: result,
      });
    }
  });
});
//END POST

//GET SPECIFIC PLAYER DATA
app.get("/get-player", function (req, res) {
  const param = req.query;
  const id = param.id;

  const queryFind = "SELECT * FROM `player_data` WHERE id = ?";
  const value = [id];

  connection.query(queryFind, value, (err, result) => {
    if (err) {
      console.log("error");
      res.status(500).json({
        succes: false,
        message: "Failed",
        data: null,
      });
    } else {
      res.status(200).json({
        succes: true,
        message: "Success",
        data: result,
      });
    }
  });
});
//END GET

//UPDATE SPECIFIC PLAYER DATA
app.put("/update-player", function (req, res) {
  const param = req.body;
  const id = param.id;
  const name = param.name;
  const age = param.age;
  const team = param.team;
  const role = param.role;

  const queryUpdate = "UPDATE `player_data` SET name = ?, age = ?, team = ?, role = ? WHERE id = ?";
  const value = [name, age, team, role, id];

  connection.query(queryUpdate, value, (err, results) => {
    if (err) {
      console.log("error");
      res.status(500).json({
        succes: false,
        message: "Failed",
        data: null,
      });
    } else {
      res.status(200).json({
        succes: true,
        message: "Success",
        data: results,
      });
    }
  });
});
//END PUT

//DELETE PLAYER DATA
app.delete("/delete-player/:id", (req, res) => {
  const userId = req.params.id;
  const sql = "DELETE FROM `player_data` WHERE id = ?";

  connection.query(sql, userId, (err, result) => {
    if (err) {
      throw err;
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "PLayer not found!" });
    }

    res.json({ message: "Deleted" });
  });

  const dropTable = "ALTER TABLE `player_data`DROP COLUMN id;";
  connection.query(dropTable, (err, results) => {
    if (err) {
      throw err;
    }
  });

  const refreshID = "ALTER TABLE `player_data` ADD `id` INT UNSIGNED NOT NULL AUTO_INCREMENT FIRST, ADD PRIMARY KEY (`id`); ";
  connection.query(refreshID, (err, results) => {
    if (err) {
      throw err;
    }
  });
});
//END DELETE

app.listen(3000);
