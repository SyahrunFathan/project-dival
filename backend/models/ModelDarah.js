import { DataTypes } from "sequelize";
import db from "../configs/Database.js";

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

export default ModelDarah;
