import ModelUser from "../../models/ModelUser.js";
import path from "path";
import bcrypt from "bcrypt";
import fs from "fs";
import { Op } from "sequelize";

export const getUsers = async (req, res) => {
  try {
    const searchKey = req.query.searchKey || "";
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const offset = limit * page;
    const totalRows = await ModelUser.count({
      where: {
        [Op.or]: {
          nama_lengkap: {
            [Op.like]: `%${searchKey}%`,
          },
          email: {
            [Op.like]: `%${searchKey}%`,
          },
        },
      },
    });

    const totalPage = Math.ceil(totalRows / limit);
    const response = await ModelUser.findAll({
      where: {
        [Op.or]: {
          nama_lengkap: {
            [Op.like]: `%${searchKey}%`,
          },
          email: {
            [Op.like]: `%${searchKey}%`,
          },
        },
      },
      limit: limit,
      offset: offset,
    });

    return res
      .status(200)
      .json({ totalPage, totalRows, page, response, limit });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await ModelUser.findByPk(req.params.id);

    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const createUser = async (req, res) => {
  const {
    nama,
    email,
    username,
    tanggalLahir,
    tempatLahir,
    alamat,
    jenisKelamin,
    telpon,
  } = req.body;
  if (nama === "")
    return res
      .status(400)
      .json({ message: "Nama Tidak Boleh Kosong!", error: "nama" });
  if (email === "")
    return res
      .status(400)
      .json({ message: "Email Tidak Boleh Kosong!", error: "email" });
  if (username === "")
    return res
      .status(400)
      .json({ message: "Username Tidak Boleh Kosong!", error: "username" });
  if (tempatLahir === "")
    return res.status(400).json({
      message: "Tempat Lahir Tidak Boleh Kosong!",
      error: "tempatLahir",
    });
  if (tanggalLahir === "")
    return res.status(400).json({
      message: "Tanggal Lahir Tidak Boleh Kosong!",
      error: "tanggalLahir",
    });
  if (alamat === "")
    return res.status(400).json({
      message: "Alamat Tidak Boleh Kosong!",
      error: "alamat",
    });
  if (jenisKelamin === "")
    return res.status(400).json({
      message: "Jenis Kelamin Tidak Boleh Kosong!",
      error: "jenisKelamin",
    });
  if (telpon === "")
    return res.status(400).json({
      message: "No Telp Tidak Boleh Kosong!",
      error: "telpon",
    });
  if (username > 20)
    return res
      .status(400)
      .json({ message: "Username terlalu panjang!", error: "username" });
  const checkEmail = await ModelUser.findAll({
    where: {
      email: email,
    },
  });
  if (checkEmail[0])
    return res
      .status(400)
      .json({ message: "Email sudah terdaftar!", error: "email" });
  if (req.files === null)
    return res
      .status(400)
      .json({ message: "Anda belum memilih gambar!", error: "foto" });
  const file = req.files.file;
  const fileSize = file.data.length;
  const fileext = path.extname(file.name);
  const filename = Date.now() + "-" + file.name;
  const url = `${req.protocol}://${req.get("host")}/public/${filename}`;
  const allowedType = [".png", ".jpeg", ".jpg"];
  if (!allowedType.includes(fileext.toLowerCase()))
    return res.status(400).json({
      message: "Gambar harus berupa .png, .jpg atau .jpeg!",
      error: "foto",
    });
  if (fileSize > 3000000)
    return res
      .status(400)
      .json({ message: "File tidak boleh melebihi 3mb!", error: "foto" });
  file.mv(`./public/${filename}`, async (err) => {
    if (err) return res.status(500).json({ message: err.message });
    try {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash("@Driver123", salt);
      await ModelUser.create({
        nama_lengkap: nama,
        email: email,
        username: username,
        tanggal_lahir: tanggalLahir,
        tempat_lahir: tempatLahir,
        alamat: alamat,
        jenis_kelamin: jenisKelamin,
        no_telp: telpon,
        foto: filename,
        path_foto: url,
        password: hashPassword,
      });
      return res.status(201).json({ message: "Data berhasil di simpan!" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  });
};

export const updateUser = async (req, res) => {
  const {
    nama,
    email,
    username,
    tanggalLahir,
    tempatLahir,
    alamat,
    jenisKelamin,
    telpon,
  } = req.body;
  if (nama === "")
    return res
      .status(400)
      .json({ message: "Nama Tidak Boleh Kosong!", error: "nama" });
  if (email === "")
    return res
      .status(400)
      .json({ message: "Email Tidak Boleh Kosong!", error: "email" });
  if (username === "")
    return res
      .status(400)
      .json({ message: "Username Tidak Boleh Kosong!", error: "username" });
  if (tempatLahir === "")
    return res.status(400).json({
      message: "Tempat Lahir Tidak Boleh Kosong!",
      error: "tempatLahir",
    });
  if (tanggalLahir === "")
    return res.status(400).json({
      message: "Tanggal Lahir Tidak Boleh Kosong!",
      error: "tanggalLahir",
    });
  if (alamat === "")
    return res.status(400).json({
      message: "Alamat Tidak Boleh Kosong!",
      error: "alamat",
    });
  if (jenisKelamin === "")
    return res.status(400).json({
      message: "Jenis Kelamin Tidak Boleh Kosong!",
      error: "jenisKelamin",
    });
  if (telpon === "")
    return res.status(400).json({
      message: "No Telp Tidak Boleh Kosong!",
      error: "telpon",
    });
  if (username > 20)
    return res
      .status(400)
      .json({ message: "Username terlalu panjang!", error: "username" });
  if (req.files === null) {
    await ModelUser.update(
      {
        nama_lengkap: nama,
        email: email,
        username: username,
        tanggal_lahir: tanggalLahir,
        tempat_lahir: tempatLahir,
        alamat: alamat,
        jenis_kelamin: jenisKelamin,
        no_telp: telpon,
      },
      {
        where: {
          id_user: req.params.id,
        },
      }
    );

    return res.status(200).json({ message: "Data berhasil di ubah!" });
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const fileext = path.extname(file.name);
    const filename = Date.now() + "-" + file.name;
    const url = `${req.protocol}://${req.get("host")}/public/${filename}`;
    const allowedType = [".png", ".jpeg", ".jpg"];
    if (!allowedType.includes(fileext.toLowerCase()))
      return res.status(400).json({
        message: "Gambar harus berupa .png, .jpg atau .jpeg!",
        error: "foto",
      });
    if (fileSize > 3000000)
      return res
        .status(400)
        .json({ message: "File tidak boleh melebihi 3mb!", error: "foto" });
    file.mv(`./public/${filename}`, async (err) => {
      if (err) return res.status(500).json({ message: err.message });
      try {
        const checkImage = await ModelUser.findAll({
          where: {
            id_user: req.params.id,
          },
        });

        if (checkImage[0]?.foto !== "default.png") {
          const filepath = `./public/${checkImage[0]?.foto}`;
          fs.unlinkSync(filepath);
        }

        await ModelUser.update(
          {
            nama_lengkap: nama,
            email: email,
            username: username,
            tanggal_lahir: tanggalLahir,
            tempat_lahir: tempatLahir,
            alamat: alamat,
            jenis_kelamin: jenisKelamin,
            no_telp: telpon,
            foto: filename,
            path_foto: url,
          },
          {
            where: {
              id_user: req.params.id,
            },
          }
        );

        return res.status(200).json({ message: "Data berhasil di simpan!" });
      } catch (error) {
        return res.status(500).json({ error });
      }
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const checkImage = await ModelUser.findAll({
      where: {
        id_user: req.params.id,
      },
    });

    if (checkImage[0]?.foto !== "default.png") {
      const filepath = `./public/${checkImage[0]?.foto}`;
      fs.unlinkSync(filepath);
    }

    await ModelUser.destroy({
      where: {
        id_user: req.params.id,
      },
    });

    return res.status(200).json({
      message: `Driver ${checkImage[0]?.nama_lengkap} berhasil di hapus!`,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
