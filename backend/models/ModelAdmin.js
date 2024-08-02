const { DataTypes } = require("sequelize");
const db = require("../configs/Database.js");

const ModelAdmin = db.define(
  "tb_admin",
  {
    id_admin: {
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    nama_lengkap: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    no_telp: {
      type: DataTypes.CHAR(20),
    },
    username: {
      type: DataTypes.STRING(30),
    },
    password: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = ModelAdmin;
