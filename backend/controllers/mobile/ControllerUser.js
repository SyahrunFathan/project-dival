const ModelUser = require("../../models/ModelUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ModelPengantaran = require("../../models/ModelPengantaran");
const ModelDarah = require("../../models/ModelDarah");
const ModelRumahSakit = require("../../models/ModelRumahSakit");
const ModelGraph = require("../../models/ModelGraph");
const { Op } = require("sequelize");

module.exports = {
  Login: async (req, res) => {
    try {
      const { username, password } = req.body;
      if (username === "")
        return res
          .status(400)
          .json({ message: "Username tidak boleh kosong!", error: "username" });
      if (password === "")
        return res
          .status(400)
          .json({ message: "Password tidak boleh kosong!", error: "password" });
      const checkUsername = await ModelUser.findAll({
        where: {
          username: username,
        },
      });

      if (!checkUsername[0])
        return res
          .status(400)
          .json({ message: "Username tidak terdaftar!", error: "username" });

      const match = await bcrypt.compare(password, checkUsername[0]?.password);
      if (!match)
        return res
          .status(400)
          .json({ message: "Password anda salah!", error: "password" });
      const userId = checkUsername[0]?.id_user;
      const name = checkUsername[0]?.nama_lengkap;
      const email = checkUsername[0]?.email;

      const token = jwt.sign(
        { userId, name, email },
        process.env.ACCESS_TOKEN,
        { expiresIn: "1d" }
      );

      await ModelUser.update({ token: token }, { where: { id_user: userId } });

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      const data = {
        userId: userId,
        email: email,
        name: name,
        username: username,
      };

      return res.status(200).json({ data, token });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  removeToken: async (req, res) => {
    try {
      await ModelUser.update(
        {
          token: null,
        },
        {
          where: {
            id_user: req.params.id,
          },
        }
      );

      res.clearCookie("token");

      return res.sendStatus(200);
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  getUserPengantaran: async (req, res) => {
    try {
      const response = await ModelPengantaran.findAll({
        include: [
          {
            model: ModelDarah,
            as: "darah",
            foreignKey: "darah_id",
          },
          {
            model: ModelRumahSakit,
            as: "rs",
            foreignKey: "rs_id",
            include: [
              {
                model: ModelGraph,
                as: "graph",
                foreignKey: "rs_id",
              },
            ],
          },
        ],
        where: {
          status: 0,
          user_id: req.params.id,
        },
      });

      return res.status(200).json({ response });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  updatePengantaranByUser: async (req, res) => {
    try {
      await ModelPengantaran.update(
        {
          status: 1,
        },
        {
          where: {
            user_id: req.params.id,
          },
        }
      );

      return res
        .status(200)
        .json({ message: "Anda berhasil menyelesaikan pengantaran!" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  getDataPengantaranBySearch: async (req, res) => {
    try {
      const search = req.query.search || "";

      const response = await ModelPengantaran.findAll({
        include: [
          {
            model: ModelDarah,
            as: "darah",
            foreignKey: "darah_id",
          },
          {
            model: ModelRumahSakit,
            as: "rs",
            foreignKey: "rs_id",
          },
        ],
        where: {
          user_id: req.query.id,
          "$rs.nama_rs$": {
            [Op.like]: `%${search}%`,
          },
        },
      });

      return res.status(200).json({ response });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};
