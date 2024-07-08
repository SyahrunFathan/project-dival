import React, { useEffect, useState } from "react";
import Layouts from "..";
import {
  IoAddCircleOutline,
  IoMedkitOutline,
  IoTrashBinOutline,
} from "react-icons/io5";
import ReactMapGL, { Marker } from "react-map-gl";
import DataTable from "react-data-table-component";
import CreateGraph from "../../components/CreateGraph";
import { useDispatch } from "react-redux";
import { GetRumahSakit } from "../../features/rumahSakitSlice";
import {
  CreateGraphSlice,
  DeleteGraphSlice,
  GetGraphSlice,
} from "../../features/graphSlice";
import { showConfirmation, showSuccess } from "../../utils/messages";

const GraphPage = () => {
  const [page, setPage] = useState("page1");
  const [tujuan, setTujuan] = useState("");
  const [tujuanError, setTujuanError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [result, setResult] = useState([]);
  const [data, setData] = useState([]);
  const rowsPerPage = 10;
  const token =
    "pk.eyJ1Ijoic3lhaHJ1bjE5IiwiYSI6ImNseHZheW5ndDFxcjUya3B4MTF6cGh3djgifQ.lndfFCRzCfSUdLfBXbaoUg";
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
      name: "Tujuan",
      selector: (row) => row.rs.nama_rs,
    },
    {
      name: "Jarak",
      selector: (row) => row.jarak,
    },
    {
      name: "Waktu",
      selector: (row) => row.waktu,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleDelete(row.id_graph, row.rs.nama_rs)}
            className="py-1 px-1 bg-red-500 text-white rounded items-center justify-center"
          >
            <IoTrashBinOutline />
          </button>
        </div>
      ),
    },
  ];

  const AmbilData = async () => {
    const response = await dispatch(GetRumahSakit());
    if (response?.payload?.status === 200) {
      setResult(response?.payload?.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tujuan === "") return setTujuanError("Tujuan tidak boleh kosong!");
    const response = await dispatch(CreateGraphSlice({ rsId: tujuan }));
    if (response?.payload?.status === 201) {
      showSuccess("Grap berhasil di buat!", () => {
        AmbilData();
        AmbilDataGraph();
        setPage("page1");
        setTujuan("");
        setTujuanError("");
      });
    } else {
      setTujuanError(response?.payload?.message);
    }
  };

  const AmbilDataGraph = async () => {
    const response = await dispatch(GetGraphSlice());
    setData(response?.payload?.data?.response);
  };

  const handleDelete = (id, nama) => {
    showConfirmation(
      "Proses Delete!",
      `Anda yakin menghapus graph ${nama}?`,
      "warning",
      "Ya, Hapus!",
      "Batal",
      async () => {
        const response = await dispatch(DeleteGraphSlice({ id: id }));
        if (response?.payload?.status === 200) {
          showSuccess(`Graph ${nama} berhasil di hapus!`, () => {
            AmbilData();
            AmbilDataGraph();
          });
        }
      }
    );
  };

  useEffect(() => {
    AmbilData();
    AmbilDataGraph();
  }, []);
  return (
    <Layouts>
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-2 font-semibold border py-2 px-3 rounded-md shadow">
          <IoMedkitOutline className="font-semibold text-lg" />
          <h1 className="text-lg">Data Graph</h1>
        </div>
        <div className="flex items-start relative gap-2 w-full mt-4">
          {page === "page1" && (
            <div className="border w-[55%] flex flex-col p-2 rounded-md shadow">
              <div className="flex justify-start items-center relative">
                <button
                  type="button"
                  onClick={() => setPage("page2")}
                  className="w-1/3 text-sm p-1 font-semibold shadow-sm rounded-full bg-blue-500 hover:bg-blue-400 text-white flex items-center justify-center gap-1"
                >
                  <IoAddCircleOutline size={18} />
                  <span>Tambah Data</span>
                </button>
              </div>
              <div className="flex flex-col mb-2 mt-4">
                <DataTable columns={columns} data={data} pagination />
              </div>
            </div>
          )}

          {page === "page2" && (
            <CreateGraph
              handleClickBack={() => {
                setPage("page1");
                setTujuan("");
                setTujuanError("");
              }}
              formData={tujuan}
              setFormData={setTujuan}
              formError={tujuanError}
              result={result}
              handleSubmit={handleSubmit}
            />
          )}

          {/* {page === "page3" && (
            <UpdateRumahSakit
              handleClickBack={handleClickBack}
              formData={formData}
              setFormData={setFormData}
              formError={formError}
              handleSubmit={handleUpdateData}
            />
          )} */}
          <div className="w-[45%] border flex">
            <ReactMapGL
              mapboxAccessToken={token}
              style={{ height: "60vh", width: "100%" }}
              initialViewState={{
                latitude: -0.9011462238195612,
                longitude: 119.87831319176668,
                zoom: 12,
              }}
              mapStyle="mapbox://styles/mapbox/streets-v11"
            >
              <Marker
                latitude={-0.9018363186733893}
                longitude={119.87812991231158}
                color="#00C77C"
              />

              {result.map((item, index) => (
                <Marker
                  key={index}
                  latitude={item?.latitude}
                  longitude={item?.longitude}
                />
              ))}
            </ReactMapGL>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default GraphPage;
