import React, { useEffect, useState } from "react";
import Layouts from "..";
import {
  IoAddCircleOutline,
  IoCreateOutline,
  IoMedkitOutline,
  IoTrashBinOutline,
} from "react-icons/io5";
import DataTable from "react-data-table-component";
import ReactMapGL, { Marker } from "react-map-gl";
import { useDispatch } from "react-redux";
import {
  CreateRumahSakitSlice,
  DeleteRumahSakit,
  GetRumahSakit,
  PatchRumahSakitById,
  UpdateRumahSakitSlice,
} from "../../features/rumahSakitSlice";
import CreateRumahSakit from "../../components/CreateRumahSakit";
import { showConfirmation, showSuccess } from "../../utils/messages";
import UpdateRumahSakit from "../../components/UpdateRumahSakit";

const RumahSakitPage = () => {
  const [page, setPage] = useState("page1");
  const [selectedMap, setSelectedMap] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [idRs, setIdRs] = useState("");
  const [formData, setFormData] = useState({
    idRs: "",
    namaRs: "",
    latitude: "",
    longitude: "",
    deskripsi: "",
  });
  const [formError, setFormError] = useState({
    namaRs: "",
    latitude: "",
    longitude: "",
    deskripsi: "",
  });
  const rowsPerPage = 10;
  const token =
    "pk.eyJ1Ijoic3lhaHJ1bjE5IiwiYSI6ImNseHZheW5ndDFxcjUya3B4MTF6cGh3djgifQ.lndfFCRzCfSUdLfBXbaoUg";
  const [data, setData] = useState([]);
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
      name: "Rumah Sakit",
      selector: (row) => row.nama_rs,
    },
    {
      name: "Latitude",
      selector: (row) => row.latitude,
    },
    {
      name: "Longitude",
      selector: (row) => row.longitude,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row.id_rs)}
            className="py-1 px-1 bg-green-500 text-white rounded items-center justify-center"
          >
            <IoCreateOutline />
          </button>
          <button
            onClick={() => handleDelete(row.id_rs, row.nama_rs)}
            className="py-1 px-1 bg-red-500 text-white rounded items-center justify-center"
          >
            <IoTrashBinOutline />
          </button>
        </div>
      ),
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleClick = (e) => {
    if (e.lngLat) {
      setSelectedMap({ lat: e.lngLat.lat, long: e.lngLat.lng });
      setFormData({
        ...formData,
        latitude: e.lngLat.lat,
        longitude: e.lngLat.lng,
      });
    }
  };

  const AmbilDataRumahSakit = () => {
    dispatch(GetRumahSakit()).then((res) => setData(res?.payload?.data));
  };

  const handleClickCreate = () => {
    setPage("page2");
  };
  const handleClickBack = () => {
    setPage("page1");
    setFormData({
      idRs: "",
      namaRs: "",
      latitude: "",
      longitude: "",
      deskripsi: "",
    });
    setFormError({
      namaRs: "",
      latitude: "",
      longitude: "",
      deskripsi: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData?.namaRs === "")
      return setFormError({ namaRs: "Rumah Sakit Tidak Boleh Kosong!" });
    if (formData?.latitude === "")
      return setFormError({
        latitude: "Latitude Rumah Sakit Tidak Boleh Kosong!",
      });
    if (formData?.longitude === "")
      return setFormError({
        longitude: "Longitude Rumah Sakit Tidak Boleh Kosong!",
      });
    // console.log(formData);
    const response = await dispatch(CreateRumahSakitSlice(formData));
    if (response?.payload?.status === 201) {
      showSuccess(response?.payload?.data?.message, () => {
        AmbilDataRumahSakit();
        setPage("page1");
        setFormData({
          namaRs: "",
          latitude: "",
          longitude: "",
          deskripsi: "",
        });
        setFormError({
          namaRs: "",
          latitude: "",
          longitude: "",
          deskripsi: "",
        });
        setSelectedMap(null);
      });
    }
  };
  const handleDelete = (id, nama) => {
    showConfirmation(
      "Proses Delete!",
      `Anda yakin menghapus ${nama}?`,
      "warning",
      "Ya, Hapus!",
      "Batal",
      async () => {
        const response = await dispatch(DeleteRumahSakit({ id: id }));
        if (response?.payload?.status === 200) {
          showSuccess(`${nama} berhasil di hapus!`, () => {
            AmbilDataRumahSakit();
          });
        }
      }
    );
  };
  const handleEdit = async (id) => {
    const response = await dispatch(PatchRumahSakitById({ id: id }));
    if (response?.payload?.status === 200) {
      setIdRs(response?.payload?.data?.id_rs);
      setFormData({
        namaRs: response?.payload?.data?.nama_rs,
        latitude: response?.payload?.data?.latitude,
        longitude: response?.payload?.data?.longitude,
        deskripsi: response?.payload?.data?.deskripsi,
      });
      setPage("page3");
    }
  };
  const handleUpdateData = async (e) => {
    e.preventDefault();
    if (formData?.namaRs === "")
      return setFormError({ namaRs: "Rumah Sakit Tidak Boleh Kosong!" });
    if (formData?.latitude === "")
      return setFormError({
        latitude: "Latitude Rumah Sakit Tidak Boleh Kosong!",
      });
    if (formData?.longitude === "")
      return setFormError({
        longitude: "Longitude Rumah Sakit Tidak Boleh Kosong!",
      });
    const response = await dispatch(
      UpdateRumahSakitSlice({ id: idRs, ...formData })
    );
    if (response?.payload?.status === 200) {
      showSuccess("Data rumah sakit berhasil di ubah!", () => {
        AmbilDataRumahSakit();
        setPage("page1");
        setFormData({
          namaRs: "",
          latitude: "",
          longitude: "",
          deskripsi: "",
        });
        setFormError({
          namaRs: "",
          latitude: "",
          longitude: "",
          deskripsi: "",
        });
        setSelectedMap(null);
      });
    }
  };

  useEffect(() => {
    AmbilDataRumahSakit();
  }, []);
  return (
    <Layouts>
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-2 font-semibold border py-2 px-3 rounded-md shadow">
          <IoMedkitOutline className="font-semibold text-lg" />
          <h1 className="text-lg">Data Rumah Sakit</h1>
        </div>
        <div className="flex items-start relative gap-2 w-full mt-4">
          {page === "page1" && (
            <div className="border w-[55%] flex flex-col p-2 rounded-md shadow">
              <div className="flex justify-start items-center relative">
                <button
                  type="button"
                  onClick={handleClickCreate}
                  className="w-1/3 text-sm p-1 font-semibold shadow-sm rounded-full bg-blue-500 hover:bg-blue-400 text-white flex items-center justify-center gap-1"
                >
                  <IoAddCircleOutline size={18} />
                  <span>Tambah Data</span>
                </button>
              </div>
              <div className="flex flex-col mb-2 mt-4">
                <DataTable
                  columns={columns}
                  data={data}
                  paginationPerPage={rowsPerPage}
                  pagination
                  onChangePage={handlePageChange}
                />
              </div>
            </div>
          )}

          {page === "page2" && (
            <CreateRumahSakit
              handleClickBack={handleClickBack}
              formData={formData}
              setFormData={setFormData}
              formError={formError}
              handleSubmit={handleSubmit}
            />
          )}

          {page === "page3" && (
            <UpdateRumahSakit
              handleClickBack={handleClickBack}
              formData={formData}
              setFormData={setFormData}
              formError={formError}
              handleSubmit={handleUpdateData}
            />
          )}
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
              onDblClick={handleClick}
            >
              <Marker
                latitude={-0.9018363186733893}
                longitude={119.87812991231158}
                color="#00C77C"
              />

              {selectedMap && (
                <Marker
                  latitude={selectedMap?.lat}
                  longitude={selectedMap?.long}
                  color="#C70C00"
                />
              )}

              {data.map((item, index) => (
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

export default RumahSakitPage;
