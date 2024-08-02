const { Op } = require("sequelize");
const ModelPengantaran = require("../../models/ModelPengantaran.js");
const ModelRumahSakit = require("../../models/ModelRumahSakit.js");
const ModelUser = require("../../models/ModelUser.js");
const ModelDarah = require("../../models/ModelDarah.js");
const ModelGraph = require("../../models/ModelGraph.js");

module.exports = {
  getSearchPengantaran: async (req, res) => {
    try {
      const searchKey = req.query.searchKey || "";
      const page = parseInt(req.query.page) || 0;
      const limit = parseInt(req.query.limit) || 10;
      const offset = limit * page;
      const totalRows = await ModelPengantaran.count({
        include: [
          {
            model: ModelRumahSakit,
            as: "rs",
            foreignKey: "rs_id",
          },
          {
            model: ModelUser,
            as: "user",
            foreignKey: "user_id",
          },
        ],
        where: {
          [Op.or]: {
            "$rs.nama_rs$": {
              [Op.like]: `%${searchKey}%`,
            },
            "$user.nama_lengkap$": {
              [Op.like]: `%${searchKey}%`,
            },
          },
        },
      });
      const totalPage = Math.ceil(totalRows / limit);
      const response = await ModelPengantaran.findAll({
        include: [
          {
            model: ModelRumahSakit,
            as: "rs",
            foreignKey: "rs_id",
          },
          {
            model: ModelUser,
            as: "user",
            foreignKey: "user_id",
          },
          {
            model: ModelDarah,
            as: "darah",
            foreignKey: "darah_id",
          },
        ],
        where: {
          [Op.or]: {
            "$rs.nama_rs$": {
              [Op.like]: `%${searchKey}%`,
            },
            "$user.nama_lengkap$": {
              [Op.like]: `%${searchKey}%`,
            },
          },
        },
        offset: offset,
        limit: limit,
        order: [["user", "nama_lengkap", "ASC"]],
      });

      return res
        .status(200)
        .json({ totalPage, totalRows, page, response, limit });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  getAllData: async (req, res) => {
    try {
      const rs = await ModelRumahSakit.findAll();
      const user = await ModelUser.findAll();
      const darah = await ModelDarah.findAll();

      return res.status(200).json({ rs, user, darah });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  createPengantaran: async (req, res) => {
    try {
      const { userId, rsId, darahId, totalDarah } = req.body;
      if (rsId === "")
        return res
          .status(400)
          .json({ message: "Rumah sakit tidak boleh kosong!", error: "rsId" });
      if (userId === "")
        return res
          .status(400)
          .json({ message: "Driver tidak boleh kosong!", error: "userId" });
      if (darahId === "")
        return res.status(400).json({
          message: "Jenis darah tidak boleh kosong!",
          error: "darahId",
        });
      if (totalDarah === "")
        return res.status(400).json({
          message: "Total darah tidak boleh kosong!",
          error: "totalDarah",
        });

      const tanggal = new Date().toISOString().split("T")[0];

      const checkTanggal = await ModelPengantaran.findAll({
        where: {
          tanggal: {
            [Op.not]: tanggal,
          },
          status: 0,
          user_id: userId,
        },
      });

      if (checkTanggal[0])
        return res.status(400).json({
          message: "Driver belum menyelesaikan pekerjaan sebelumnya!",
          error: "userId",
        });

      const checkRsUser = await ModelPengantaran.findAll({
        where: {
          user_id: userId,
          status: 0,
          rs_id: {
            [Op.not]: rsId,
          },
        },
      });

      if (checkRsUser[0])
        return res.status(400).json({
          message: "Driver melakukan pengantaran ke rs lain!",
          error: "userId",
        });

      const checkDarah = await ModelPengantaran.findAll({
        where: {
          user_id: userId,
          darah_id: darahId,
          status: 0,
          rs_id: rsId,
        },
      });

      if (checkDarah[0])
        return res.status(400).json({
          message: "Darah sudah masuk dalam pengantaran!",
          error: "darahId",
        });

      const checkStokDarah = await ModelDarah.findAll({
        where: {
          id_darah: darahId,
        },
      });

      const stok = parseFloat(checkStokDarah[0].stok);
      if (stok < parseFloat(totalDarah))
        return res
          .status(400)
          .json({ message: "Stok darah tidak cukup!", error: "darahId" });

      await ModelPengantaran.create({
        user_id: userId,
        rs_id: rsId,
        darah_id: darahId,
        total_darah: totalDarah,
        status: 0,
        tanggal: tanggal,
      });

      const totalSekarang = stok - parseFloat(totalDarah);

      await ModelDarah.update(
        {
          stok: totalSekarang,
        },
        {
          where: {
            id_darah: darahId,
          },
        }
      );

      return res.status(201).json({ message: "Data berhasil di simpan!" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  deletePengantaran: async (req, res) => {
    try {
      const ambildata = await ModelPengantaran.findByPk(req.params.id);

      const ambilStok = await ModelDarah.findByPk(ambildata.darah_id);

      const updateStok = ambilStok.stok + ambildata.total_darah;

      await ModelPengantaran.destroy({
        where: { id_pengantaran: req.params.id },
      });

      await ModelDarah.update(
        {
          stok: updateStok,
        },
        {
          where: {
            id_darah: ambildata.darah_id,
          },
        }
      );

      return res.status(200).json({ message: "Data berhasil di hapus!" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  getCountAll: async (req, res) => {
    try {
      const totalRs = await ModelRumahSakit.count();
      const totalGraph = await ModelGraph.count();
      const totalDarah = await ModelDarah.count();
      const totalPengantaran = await ModelPengantaran.count();

      return res
        .status(200)
        .json({ totalDarah, totalGraph, totalPengantaran, totalRs });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};
