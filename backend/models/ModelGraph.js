import { DataTypes } from "sequelize";
import db from "../configs/Database.js";
import ModelRumahSakit from "./ModelRumahSakit.js";

const ModelGraph = db.define(
  "tb_graph",
  {
    id_graph: {
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    rs_id: {
      type: DataTypes.STRING,
    },
    jarak: {
      type: DataTypes.STRING,
    },
    waktu: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

ModelGraph.belongsTo(ModelRumahSakit, { foreignKey: "rs_id", as: "rs" });

export default ModelGraph;
