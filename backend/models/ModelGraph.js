const { DataTypes } = require("sequelize");
const db = require("../configs/Database.js");
const ModelRumahSakit = require("./ModelRumahSakit.js");

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
ModelRumahSakit.hasMany(ModelGraph, { foreignKey: "rs_id", as: "graph" });

module.exports = ModelGraph;
