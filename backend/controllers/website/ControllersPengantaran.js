import { col, Op } from "sequelize";
import ModelPengantaran from "../../models/ModelPengantaran.js";
import ModelRumahSakit from "../../models/ModelRumahSakit.js";
import ModelUser from "../../models/ModelUser.js";
import ModelDarah from "../../models/ModelDarah.js";

export const getSearchPengantaran = async (req, res) => {
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
};
