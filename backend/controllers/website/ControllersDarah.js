const ModelDarah = require("../../models/ModelDarah.js");

module.exports = {
  getDarah: async (req, res) => {
    try {
      const response = await ModelDarah.findAll();

      return res.status(200).json({ response });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  createDarah: async (req, res) => {
    try {
      const { jenisDarah, stok } = req.body;
      const checkDarah = await ModelDarah.findAll({
        where: { jenis_darah: jenisDarah },
      });

      if (checkDarah[0])
        return res.status(400).json({ message: "Darah sudah ada!" });

      await ModelDarah.create({
        jenis_darah: jenisDarah,
        stok: stok,
      });

      return res.status(201).json({ message: "Berhasil di simpan!" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  getDarahById: async (req, res) => {
    try {
      const response = await ModelDarah.findByPk(req.params.id);

      return res.status(200).json({ response });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  updateDarah: async (req, res) => {
    try {
      const { stok } = req.body;
      await ModelDarah.update(
        {
          stok: stok,
        },
        {
          where: {
            id_darah: req.params.id,
          },
        }
      );

      return res.status(200).json({ message: "Data berhasil di ubah!" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  deleteDarah: async (req, res) => {
    try {
      await ModelDarah.destroy({
        where: {
          id_darah: req.params.id,
        },
      });

      return res.status(200).json({ message: "Data berhasil di hapus!" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};
