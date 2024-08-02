const { DataTypes } = require("sequelize");
const db = require("../configs/Database.js");

const ModelRumahSakit = db.define(
  "tb_rs",
  {
    id_rs: {
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    nama_rs: {
      type: DataTypes.STRING,
    },
    deskripsi: {
      type: DataTypes.TEXT,
    },
    latitude: {
      type: DataTypes.STRING,
    },
    longitude: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = ModelRumahSakit;
