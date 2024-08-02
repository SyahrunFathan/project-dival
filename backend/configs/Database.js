const { Sequelize } = require("sequelize");

const db = new Sequelize("db_donor", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = db;
