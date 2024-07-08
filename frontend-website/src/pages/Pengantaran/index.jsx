import React, { useEffect, useState } from "react";
import Layouts from "..";
import {
  IoAddCircleOutline,
  IoMedkitOutline,
  IoSearch,
  IoTrash,
} from "react-icons/io5";
import { useDispatch } from "react-redux";
import { GetPengantaran } from "../../features/pengantaranSlice";
import ReactPaginate from "react-paginate";

const PengantaranPage = () => {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [data, setData] = useState([]);

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
  return (
    <Layouts>
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-2 font-semibold border py-2 px-3 rounded-md shadow">
          <IoMedkitOutline className="font-semibold text-lg" />
          <h1 className="text-lg">Data Pengantaran Darah</h1>
        </div>
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
                //   onClick={handleClickCreate}
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
                                HandleDeleteGuru(item?.id_guru, item?.nama_guru)
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
      </div>
    </Layouts>
  );
};

export default PengantaranPage;
