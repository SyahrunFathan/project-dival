const ModelGraph = require("../../models/ModelGraph.js");
const ModelRumahSakit = require("../../models/ModelRumahSakit.js");

module.exports = {
  getRumahSakit: async (req, res) => {
    try {
      const response = await ModelRumahSakit.findAll();

      return res.status(200).json({ response });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  getRumahSakitById: async (req, res) => {
    try {
      const response = await ModelRumahSakit.findOne({
        where: {
          id_rs: req.params.id,
        },
      });

      return res.status(200).json({ response });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  createRumahSakit: async (req, res) => {
    try {
      const { namaRs, latitude, longitude, deskripsi } = req.body;
      const checkLokasi = await ModelRumahSakit.findAll({
        where: {
          latitude: latitude,
          longitude: longitude,
        },
      });
      if (checkLokasi > 0)
        return res
          .status(400)
          .json({ message: "Rumah Sakit Sudah Terdaftar!" });

      await ModelRumahSakit.create({
        nama_rs: namaRs,
        latitude: latitude,
        longitude: longitude,
        deskripsi: deskripsi,
      });

      return res
        .status(201)
        .json({ message: `Rumah sakit ${namaRs} berhasil di simpan!` });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  deleteRumahSakit: async (req, res) => {
    try {
      const checkGraph = await ModelGraph.findAll({
        where: {
          rs_id: req.params.id,
        },
      });
      if (checkGraph[0]) {
        await ModelGraph.destroy({
          where: {
            rs_id: req.params.id,
          },
        });
      }

      await ModelRumahSakit.destroy({
        where: {
          id_rs: req.params.id,
        },
      });

      return res.status(200).json({ message: "Berhasil di hapus!" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  updateRumahSakit: async (req, res) => {
    try {
      const { namaRs, latitude, longitude, deskripsi } = req.body;

      await ModelRumahSakit.update(
        {
          nama_rs: namaRs,
          latitude: latitude,
          longitude: longitude,
          deskripsi: deskripsi,
        },
        {
          where: {
            id_rs: req.params.id,
          },
        }
      );

      return res.status(200).json({ message: "Berhasil di ubah!" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};
