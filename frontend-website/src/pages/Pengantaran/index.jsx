import React, { useEffect, useState } from "react";
import Layouts from "..";
import {
  IoAddCircleOutline,
  IoMedkitOutline,
  IoSearch,
  IoTrash,
} from "react-icons/io5";
import { useDispatch } from "react-redux";
import {
  CreatePengantaran,
  DeletePengantaran,
  GetPengantaran,
} from "../../features/pengantaranSlice";
import ReactPaginate from "react-paginate";
import { patchAllData } from "../../utils/apis";
import { showConfirmation, showSuccess } from "../../utils/messages";

const PengantaranPage = () => {
  const [search, setSearch] = useState("");
  const [view, setView] = useState("page1");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [data, setData] = useState([]);
  const [dataRs, setDataRs] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [dataDarah, setDataDarah] = useState([]);
  const [formData, setFormData] = useState({
    userId: "",
    rsId: "",
    darahId: "",
    totalDarah: "",
  });
  const [formError, setFormError] = useState({
    userId: "",
    rsId: "",
    darahId: "",
    totalDarah: "",
  });

  const dispatch = useDispatch();

  const AmbilData = async () => {
    try {
      const response = await dispatch(
        GetPengantaran({ searchKey: search, limit: limit, page: page })
      );
      setLimit(response.payload.data.limit);
      setPage(response.payload.data.page);
      setTotalPage(response.payload.data.totalPage);
      setTotalRows(response.payload.data.totalRows);
      setData(response.payload.data.response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AmbilData();
  }, [search, page]);

  const HandleChangePage = ({ selected }) => {
    setPage(selected);
  };

  const handleCreateData = async () => {
    setView("page2");
    try {
      const response = await patchAllData();
      setDataRs(response.data.rs);
      setDataUser(response.data.user);
      setDataDarah(response.data.darah);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(CreatePengantaran(formData));
      if (response.payload.status === 201) {
        showSuccess(response.payload.data.message, () => {
          AmbilData();
          setView("page1");
          setFormData({
            darahId: "",
            rsId: "",
            totalDarah: "",
            userId: "",
          });
          setFormError({
            darahId: "",
            rsId: "",
            totalDarah: "",
            userId: "",
          });
        });
      } else {
        if (response.payload.error === "rsId")
          return setFormError({ rsId: response.payload.message });
        if (response.payload.error === "userId")
          return setFormError({ userId: response.payload.message });
        if (response.payload.error === "darahId")
          return setFormError({ darahId: response.payload.message });
        if (response.payload.error === "totalDarah")
          return setFormError({ totalDarah: response.payload.message });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    showConfirmation(
      "Proses Delete!",
      "Anda yakin menghapus data ini?",
      "warning",
      "Ya, Hapus!",
      "Batal",
      async () => {
        try {
          const response = await dispatch(DeletePengantaran({ id: id }));
          if (response.payload.status === 200) {
            showSuccess(response.payload.data.message, () => {
              AmbilData();
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    );
  };
  return (
    <Layouts>
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-2 font-semibold border py-2 px-3 rounded-md shadow">
          <IoMedkitOutline className="font-semibold text-lg" />
          <h1 className="text-lg">Data Pengantaran Darah</h1>
        </div>
        {view === "page1" && (
          <div className="flex flex-col items-start relative w-full mt-4">
            <div className="border w-full flex flex-col p-2 rounded-md shadow">
              <div className="flex justify-between items-center relative">
                <div className="flex flex-row relative w-[100%] lg:w-[70%] items-center gap-2">
                  <input
                    type="text"
                    className="border shadow-sm rounded-md py-1 w-[98%] lg:w-[45%] ps-7"
                    placeholder="Pencarian"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <div className="absolute left-1">
                    <IoSearch className="text-gray-400" />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCreateData}
                  className="w-1/5 text-sm p-1 font-semibold shadow-sm rounded-full bg-blue-500 hover:bg-blue-400 text-white flex items-center justify-center gap-1"
                >
                  <IoAddCircleOutline size={18} />
                  <span>Tambah Data</span>
                </button>
              </div>
              <div className="flex flex-col mb-2 mt-4">
                <div className="relative overflow-x-auto mb-2 mt-4">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs border-b">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          No.
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Nama Driver
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Tujuan
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Jenis Darah
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Total Darah
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        data.map((item, index) => (
                          <tr className="bg-white border-b" key={index}>
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                            >
                              {page * limit + index + 1}
                            </th>
                            <td className="px-6 py-4">
                              {item?.user?.nama_lengkap}
                            </td>
                            <td className="px-6 py-4">{item?.rs?.nama_rs}</td>
                            <td className="px-6 py-4">
                              {item?.darah?.jenis_darah}
                            </td>
                            <td className="px-6 py-4">{item?.total_darah}</td>
                            <td
                              className={
                                "px-6 py-4 " +
                                (item?.status === 0
                                  ? "text-red-500"
                                  : "text-green-500")
                              }
                            >
                              {item?.status === 0 ? "Proses" : "Selesai"}
                            </td>
                            <td className="px-6 py-4 flex flex-row gap-2 items-center">
                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(item?.id_pengantaran)
                                }
                                className="text-sm text-red-400 font-semibold"
                              >
                                <IoTrash size={20} />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <th colSpan={6} className="text-center text-blue-500">
                            Data Masih Kosong!
                          </th>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-400">
                    Total Data {totalRows} Page {totalRows && page + 1} Of{" "}
                    {totalPage}
                  </p>
                  <ReactPaginate
                    previousLabel={
                      <span className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
                        {"<"}
                      </span>
                    }
                    nextLabel={
                      <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
                        {">"}
                      </span>
                    }
                    containerClassName="flex items-center -space-x-px h-8 text-sm"
                    pageClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                    pageCount={totalPage}
                    onPageChange={HandleChangePage}
                    activeClassName="bg-blue-600 text-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {view === "page2" && (
          <div className="flex flex-col items-start relative w-full mt-4">
            <div className="border w-full flex flex-col p-2 rounded-md shadow">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold">
                      Pilih Rumah Sakit Tujuan :
                    </label>
                    <div className="flex flex-col">
                      <select
                        className={
                          "border p-1 w-1/3 rounded-md shadow-sm " +
                          (formError.rsId && "border-red-500")
                        }
                        value={formData.rsId}
                        onChange={(e) =>
                          setFormData({ ...formData, rsId: e.target.value })
                        }
                      >
                        <option value="">-- Pilih Rumah Sakit --</option>
                        {dataRs.map((item, index) => (
                          <option value={item.id_rs} key={index}>
                            {item.nama_rs}
                          </option>
                        ))}
                      </select>
                      {formError.rsId && (
                        <p className="text-sm text-red-500">{formError.rsId}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold">
                      Pilih Driver :
                    </label>
                    <div className="flex flex-col">
                      <select
                        className={
                          "border p-1 w-1/3 rounded-md shadow-sm " +
                          (formError.userId && "border-red-500")
                        }
                        value={formData.userId}
                        onChange={(e) =>
                          setFormData({ ...formData, userId: e.target.value })
                        }
                      >
                        <option value="">-- Pilih Driver --</option>
                        {dataUser.map((item, index) => (
                          <option value={item.id_user} key={index}>
                            {item.nama_lengkap}
                          </option>
                        ))}
                      </select>
                      {formError.userId && (
                        <p className="text-sm text-red-500">
                          {formError.userId}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold">
                      Pilih Darah :
                    </label>
                    <div className="flex flex-col">
                      <select
                        className={
                          "border p-1 w-1/3 rounded-md shadow-sm " +
                          (formError.darahId && "border-red-500")
                        }
                        value={formData.darahId}
                        onChange={(e) =>
                          setFormData({ ...formData, darahId: e.target.value })
                        }
                      >
                        <option value="">-- Pilih Darah --</option>
                        {dataDarah.map((item, index) => (
                          <option value={item.id_darah} key={index}>
                            {item.jenis_darah}
                          </option>
                        ))}
                      </select>
                      {formError.darahId && (
                        <p className="text-sm text-red-500">
                          {formError.darahId}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold">
                      Total Darah :
                    </label>
                    <div className="flex flex-col">
                      <input
                        type="number"
                        className={
                          "border p-1 w-1/3 rounded-md shadow-sm " +
                          (formError.totalDarah && "border-red-500")
                        }
                        value={formData.totalDarah}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            totalDarah: e.target.value,
                          })
                        }
                        placeholder="0"
                      />
                      {formError.totalDarah && (
                        <p className="text-sm text-red-500">
                          {formError.totalDarah}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold"></label>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="border w-1/5 p-1 rounded-md shadow-sm bg-blue-500 hover:bg-blue-400 text-white font-semibold text-sm"
                      >
                        Simpan Data
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setView("page1");
                          setFormData({
                            darahId: "",
                            rsId: "",
                            totalDarah: "",
                            userId: "",
                          });
                          setFormError({
                            darahId: "",
                            rsId: "",
                            totalDarah: "",
                            userId: "",
                          });
                        }}
                        className="border w-1/5 p-1 rounded-md shadow-sm bg-yellow-500 hover:bg-yellow-400 text-white font-semibold text-sm"
                      >
                        Kembali
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layouts>
  );
};

export default PengantaranPage;
