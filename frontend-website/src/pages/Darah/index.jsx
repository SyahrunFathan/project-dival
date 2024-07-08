import React, { useEffect, useState } from "react";
import Layouts from "..";
import {
  IoCreateOutline,
  IoMedkitOutline,
  IoTrashBinOutline,
} from "react-icons/io5";
import DataTable from "react-data-table-component";
import { useDispatch } from "react-redux";
import {
  CreateDarah,
  DeleteDarahById,
  GetDarah,
  GetDarahById,
  PutDarahById,
} from "../../features/darahSlice";
import { showConfirmation, showSuccess } from "../../utils/messages";

const DarahPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [idDarah, setIdDarah] = useState("");
  const [formData, setFormData] = useState({
    jenisDarah: "",
    stok: "",
  });
  const [formError, setFormError] = useState({
    jenisDarah: "",
    stok: "",
  });

  const rowsPerPage = 10;
  const dispatch = useDispatch();

  const columns = [
    {
      name: "No",
      selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1,
      cell: (row, index) => (
        <div style={{ width: "20px", textAlign: "center" }}>
          {(currentPage - 1) * rowsPerPage + index + 1}
        </div>
      ),
    },
    {
      name: "Jenis Darah",
      selector: (row, index) => row.jenis_darah,
    },
    {
      name: "Stok",
      selector: (row, index) => row.stok,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row.id_darah)}
            className="py-1 px-1 bg-green-500 text-white rounded items-center justify-center"
          >
            <IoCreateOutline />
          </button>
          <button
            onClick={() => handleDelete(row.id_darah, row.jenis_darah)}
            className="py-1 px-1 bg-red-500 text-white rounded items-center justify-center"
          >
            <IoTrashBinOutline />
          </button>
        </div>
      ),
    },
  ];

  const AmbilDataDarah = async () => {
    try {
      const response = await dispatch(GetDarah());
      setData(response?.payload?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData?.jenisDarah === "")
      return setFormError({ jenisDarah: "Jenis Darah Tidak Boleh Kosong!" });
    if (formData?.stok === "")
      return setFormError({ stok: "Stok Tidak Boleh Kosong!" });
    if (idDarah === "") {
      try {
        const response = await dispatch(CreateDarah(formData));
        if (response?.payload?.status === 201) {
          showSuccess("Data berhasil di simpan!", () => {
            AmbilDataDarah();
            setFormData({
              jenisDarah: "",
              stok: "",
            });
            setFormError({
              jenisDarah: "",
              stok: "",
            });
            setIdDarah("");
          });
        } else {
          setFormError({ jenisDarah: response?.payload?.message });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await dispatch(
          PutDarahById({ id: idDarah, stok: formData?.stok })
        );

        if (response?.payload?.status === 200) {
          showSuccess(response?.payload?.data?.message, () => {
            AmbilDataDarah();
            setFormData({
              jenisDarah: "",
              stok: "",
            });
            setIdDarah("");
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = (id, name) => {
    showConfirmation(
      "Proses Delete!",
      `Anda yakin menghapus ${name}?`,
      "warning",
      "Ya, Hapus!",
      "Batal",
      async () => {
        try {
          const response = await dispatch(DeleteDarahById({ id: id }));
          if (response.payload.status === 200) {
            showSuccess(response.payload.data.message, () => {
              setFormData({
                jenisDarah: "",
                stok: "",
              });
              setIdDarah("");
              AmbilDataDarah();
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    );
  };

  useEffect(() => {
    AmbilDataDarah();
  }, []);

  const handleEdit = async (id) => {
    try {
      const response = await dispatch(GetDarahById({ id: id }));
      setFormData({
        jenisDarah: response?.payload?.data?.jenis_darah,
        stok: response?.payload?.data?.stok,
      });
      setIdDarah(response?.payload?.data?.id_darah);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layouts>
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-2 font-semibold border py-2 px-3 rounded-md shadow">
          <IoMedkitOutline className="font-semibold text-lg" />
          <h1 className="text-lg">Data Darah</h1>
        </div>
        <div className="flex items-start justify-start relative my-3 gap-2">
          <div className="w-[60%] border p-2 shadow-sm rounded-md">
            <DataTable
              columns={columns}
              data={data}
              pagination
              paginationPerPage={rowsPerPage}
              onChangePage={handleChangePage}
            />
          </div>
          <div className="flex flex-col w-[40%] border p-2 shadow-sm rounded-md">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2 my-2">
                <label htmlFor="jenisDarah" className="font-semibold">
                  Jenis Darah :
                </label>
                <select
                  id="jenisDarah"
                  className={
                    "border p-1 rounded-md " +
                    (formError?.jenisDarah && "border-red-500")
                  }
                  value={formData.jenisDarah}
                  onChange={(e) =>
                    setFormData({ ...formData, jenisDarah: e.target.value })
                  }
                  disabled={idDarah !== "" ? true : false}
                >
                  <option value="">-- Pilih Darah --</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="AB">AB</option>
                  <option value="O">O</option>
                </select>
                {formError.jenisDarah && (
                  <p className="text-red-500">{formError.jenisDarah}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 my-2">
                <label htmlFor="totalDarah" className="font-semibold">
                  Total Darah :
                </label>
                <input
                  type="number"
                  id="totalDarah"
                  placeholder="0"
                  className={
                    "border px-2 py-1 rounded-md " +
                    (formError.stok && "border-red-500")
                  }
                  value={formData.stok}
                  onChange={(e) =>
                    setFormData({ ...formData, stok: e.target.value })
                  }
                />
                {formError.stok && (
                  <p className="text-red-500">{formError.stok}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 my-2">
                <label htmlFor="" className="font-semibold"></label>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="border flex flex-col justify-center items-center w-1/3 px-3 py-1 rounded-md bg-blue-500 text-white"
                  >
                    Simpan Data
                  </button>
                  {idDarah !== "" && (
                    <button
                      type="button"
                      onClick={() => {
                        setIdDarah("");
                        setFormData({
                          jenisDarah: "",
                          stok: "",
                        });
                      }}
                      className="border flex flex-col justify-center items-center w-1/3 px-3 py-1 rounded-md bg-red-500 text-white"
                    >
                      Batal
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default DarahPage;
