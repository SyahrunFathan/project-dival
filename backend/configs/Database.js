import { Sequelize } from "sequelize";

const db = new Sequelize("db_donor", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

export default db;
