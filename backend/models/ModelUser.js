import { DataTypes } from "sequelize";
import db from "../configs/Database.js";

const ModelUser = db.define(
  "tb_user",
  {
    id_user: {
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
    tanggal_lahir: {
      type: DataTypes.DATEONLY,
    },
    tempat_lahir: {
      type: DataTypes.STRING,
    },
    alamat: {
      type: DataTypes.STRING,
    },
    jenis_kelamin: {
      type: DataTypes.ENUM("L", "P"),
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
    foto: {
      type: DataTypes.STRING,
    },
    path_foto: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

export default ModelUser;
