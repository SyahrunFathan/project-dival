const { DataTypes } = require("sequelize");
const db = require("../configs/Database.js");
const ModelUser = require("./ModelUser.js");
const ModelRumahSakit = require("./ModelRumahSakit.js");
const ModelDarah = require("./ModelDarah.js");

const ModelPengantaran = db.define(
  "tb_pengantaran",
  {
    id_pengantaran: {
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        notEmpty: true,
      },
    },
    user_id: {
      type: DataTypes.STRING,
    },
    rs_id: {
      type: DataTypes.STRING,
    },
    darah_id: {
      type: DataTypes.INTEGER,
    },
    total_darah: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.INTEGER,
    },
    tanggal: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    freezeTableName: true,
  }
);

ModelPengantaran.belongsTo(ModelUser, { foreignKey: "user_id", as: "user" });
ModelPengantaran.belongsTo(ModelRumahSakit, { foreignKey: "rs_id", as: "rs" });
ModelPengantaran.belongsTo(ModelDarah, { foreignKey: "darah_id", as: "darah" });

module.exports = ModelPengantaran;
