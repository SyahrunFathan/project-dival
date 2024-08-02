const { DataTypes } = require("sequelize");
const db = require("../configs/Database.js");

const ModelDarah = db.define(
  "tb_darah",
  {
    id_darah: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    jenis_darah: {
      type: DataTypes.STRING(10),
    },
    stok: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = ModelDarah;
