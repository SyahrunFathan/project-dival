const ModelAdmin = require("../../models/ModelAdmin.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  LoginAdmin: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email === "")
        return res
          .status(400)
          .json({ message: "Email tidak boleh kosong!", error: "email" });
      if (password === "")
        return res
          .status(400)
          .json({ message: "Password tidak boleh kosong!", error: "password" });
      const checkEmail = await ModelAdmin.findOne({ where: { email: email } });
      if (!checkEmail)
        return res
          .status(400)
          .json({ message: "Email tidak terdaftar!", error: "email" });
      const match = await bcrypt.compare(password, checkEmail.password);
      if (!match)
        return res
          .status(400)
          .json({ message: "Password anda salah!", error: "password" });

      const userId = checkEmail.id_admin;
      const name = checkEmail.username;

      const token = jwt.sign(
        { userId, email, name },
        process.env.ACCESS_TOKEN,
        { expiresIn: "1d" }
      );

      await ModelAdmin.update(
        {
          token: token,
        },
        {
          where: {
            id_admin: userId,
          },
        }
      );

      const data = {
        userId: userId,
        name: name,
        email: email,
      };

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({ data, token });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  createAdmin: async (req, res) => {
    try {
      const { nama, email, noTelp, username, password } = req.body;
      const checkEmail = await ModelAdmin.findAll({ where: { email: email } });
      if (checkEmail[0])
        return res.status(400).json({ message: "Email sudah terdaftar!" });

      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);

      await ModelAdmin.create({
        nama_lengkap: nama,
        email: email,
        no_telp: noTelp,
        username: username,
        password: hashPassword,
      });

      return res.status(201).json({ message: "Created successfully..." });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  removeToken: async (req, res) => {
    try {
      await ModelAdmin.update(
        {
          token: null,
        },
        {
          where: {
            id_admin: req.params.id,
          },
        }
      );

      res.clearCookie("token");

      return res.sendStatus(200);
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};
