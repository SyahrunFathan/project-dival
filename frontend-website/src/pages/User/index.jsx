import React, { useEffect, useState } from "react";
import Layouts from "..";
import {
  IoAddCircleOutline,
  IoArrowBack,
  IoMedkitOutline,
  IoPencil,
  IoSearch,
  IoTrash,
} from "react-icons/io5";
import { useDispatch } from "react-redux";
import {
  DeleteUserSlice,
  GetUserById,
  GetUsers,
} from "../../features/userSlice";
import ReactPaginate from "react-paginate";
import { ILDefaultIcon } from "../../assets/icons";
import { postUserApi, updateUserApi } from "../../utils/apis";
import { showConfirmation, showSuccess } from "../../utils/messages";

const UserPage = () => {
  const [view, setView] = useState("page1");
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    username: "",
    tempatLahir: "",
    tanggalLahir: "",
    alamat: "",
    jenisKelamin: "",
    telpon: "",
    foto: "",
  });

  const [formError, setFormError] = useState({
    nama: "",
    email: "",
    username: "",
    tanggalLahir: "",
    tempatLahir: "",
    alamat: "",
    jenisKelamin: "",
    telpon: "",
    foto: "",
  });

  const dispatch = useDispatch();

  const AmbilDataUser = async () => {
    try {
      const response = await dispatch(
        GetUsers({ searchKey: search, limit: limit, page: page })
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
    AmbilDataUser();
  }, [search, page]);

  const HandleChangePage = ({ selected }) => {
    setPage(selected);
  };

  const handleBackPage = () => {
    setView("page1");
    setFormData({
      nama: "",
      email: "",
      tanggalLahir: "",
      tempatLahir: "",
      alamat: "",
      jenisKelamin: "",
      telpon: "",
      username: "",
      foto: "",
    });
    setFormError({
      nama: "",
      email: "",
      tanggalLahir: "",
      tempatLahir: "",
      alamat: "",
      jenisKelamin: "",
      telpon: "",
      username: "",
      foto: "",
    });
    setImageSrc(null);
    setImageFile(null);
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();
    if (userId === "") {
      try {
        const data = new FormData();
        data.append("file", imageFile);
        data.append("nama", formData.nama);
        data.append("email", formData.email);
        data.append("username", formData.username);
        data.append("tempatLahir", formData.tempatLahir);
        data.append("tanggalLahir", formData.tanggalLahir);
        data.append("alamat", formData.alamat);
        data.append("jenisKelamin", formData.jenisKelamin);
        data.append("telpon", formData.telpon);

        const response = await postUserApi(data);
        if (response?.status === 201) {
          showSuccess(response?.data?.message, () => {
            AmbilDataUser();
            setView("page1");
            setFormData({
              nama: "",
              email: "",
              tanggalLahir: "",
              tempatLahir: "",
              alamat: "",
              jenisKelamin: "",
              telpon: "",
              username: "",
              foto: "",
            });
            setFormError({
              nama: "",
              email: "",
              tanggalLahir: "",
              tempatLahir: "",
              alamat: "",
              jenisKelamin: "",
              telpon: "",
              username: "",
              foto: "",
            });
            setImageSrc(null);
            setImageFile(null);
          });
        }
      } catch (error) {
        if (error?.response?.status === 400) {
          if (error?.response?.data?.error === "nama")
            return setFormError({ nama: error?.response?.data?.message });
          if (error?.response?.data?.error === "email")
            return setFormError({ email: error?.response?.data?.message });
          if (error?.response?.data?.error === "username")
            return setFormError({ username: error?.response?.data?.message });
          if (error?.response?.data?.error === "tempatLahir")
            return setFormError({
              tempatLahir: error?.response?.data?.message,
            });
          if (error?.response?.data?.error === "tanggalLahir")
            return setFormError({
              tanggalLahir: error?.response?.data?.message,
            });
          if (error?.response?.data?.error === "alamat")
            return setFormError({ alamat: error?.response?.data?.message });
          if (error?.response?.data?.error === "jenisKelamin")
            return setFormError({
              jenisKelamin: error?.response?.data?.message,
            });
          if (error?.response?.data?.error === "telpon")
            return setFormError({ telpon: error?.response?.data?.message });
          if (error?.response?.data?.error === "foto")
            return setFormError({ foto: error?.response?.data?.message });
        }
      }
    } else {
      try {
        const data = new FormData();
        data.append("file", imageFile);
        data.append("nama", formData.nama);
        data.append("email", formData.email);
        data.append("username", formData.username);
        data.append("tempatLahir", formData.tempatLahir);
        data.append("tanggalLahir", formData.tanggalLahir);
        data.append("alamat", formData.alamat);
        data.append("jenisKelamin", formData.jenisKelamin);
        data.append("telpon", formData.telpon);

        const response = await updateUserApi(userId, data);
        if (response?.status === 200) {
          showSuccess(response?.data?.message, () => {
            AmbilDataUser();
            setView("page1");
            setFormData({
              nama: "",
              email: "",
              tanggalLahir: "",
              tempatLahir: "",
              alamat: "",
              jenisKelamin: "",
              telpon: "",
              username: "",
              foto: "",
            });
            setFormError({
              nama: "",
              email: "",
              tanggalLahir: "",
              tempatLahir: "",
              alamat: "",
              jenisKelamin: "",
              telpon: "",
              username: "",
              foto: "",
            });
            setImageSrc(null);
            setImageFile(null);
          });
        }
      } catch (error) {
        if (error?.response?.status === 400) {
          if (error?.response?.data?.error === "nama")
            return setFormError({ nama: error?.response?.data?.message });
          if (error?.response?.data?.error === "email")
            return setFormError({ email: error?.response?.data?.message });
          if (error?.response?.data?.error === "username")
            return setFormError({ username: error?.response?.data?.message });
          if (error?.response?.data?.error === "tempatLahir")
            return setFormError({
              tempatLahir: error?.response?.data?.message,
            });
          if (error?.response?.data?.error === "tanggalLahir")
            return setFormError({
              tanggalLahir: error?.response?.data?.message,
            });
          if (error?.response?.data?.error === "alamat")
            return setFormError({ alamat: error?.response?.data?.message });
          if (error?.response?.data?.error === "jenisKelamin")
            return setFormError({
              jenisKelamin: error?.response?.data?.message,
            });
          if (error?.response?.data?.error === "telpon")
            return setFormError({ telpon: error?.response?.data?.message });
          if (error?.response?.data?.error === "foto")
            return setFormError({ foto: error?.response?.data?.message });
        }
      }
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await dispatch(GetUserById({ id: id }));
      if (response?.payload?.status === 200) {
        setView("page2");
        setFormData({
          nama: response?.payload?.data?.nama_lengkap,
          alamat: response?.payload?.data?.alamat,
          email: response?.payload?.data?.email,
          foto: response?.payload?.data?.foto,
          jenisKelamin: response?.payload?.data?.jenis_kelamin,
          username: response?.payload?.data?.username,
          tanggalLahir: response?.payload?.data?.tanggal_lahir,
          tempatLahir: response?.payload?.data?.tempat_lahir,
          telpon: response?.payload?.data?.no_telp,
        });
        setImageSrc(response?.payload?.data?.path_foto);
        setUserId(response?.payload?.data?.id_user);
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
          const response = await dispatch(DeleteUserSlice({ id: id }));
          if (response?.payload?.status === 200) {
            showSuccess(response?.payload?.data?.message, () => {
              AmbilDataUser();
            });
          }
        } catch (error) {
          console.log(error?.response?.data);
        }
      }
    );
  };

  return (
    <Layouts>
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-2 font-semibold border py-2 px-3 rounded-md shadow">
          <IoMedkitOutline className="font-semibold text-lg" />
          <h1 className="text-lg">Data User</h1>
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
                  onClick={() => setView("page2")}
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
                          Nama
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                          No.Telpon
                        </th>
                        <th scope="col" className="px-6 py-3">
                          TTL
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Alamat
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
                            <td className="px-6 py-4">{item?.nama_lengkap}</td>
                            <td className="px-6 py-4 text-blue-500">
                              {item?.email}
                            </td>
                            <td className="px-6 py-4 text-blue-500">
                              {item?.no_telp}
                            </td>
                            <td className="px-6 py-4">
                              {item?.tempat_lahir},
                              {new Intl.DateTimeFormat("id-ID", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              }).format(new Date(item?.tanggal_lahir))}
                            </td>
                            <td className="px-6 py-4">{item?.alamat}</td>
                            <td className="px-6 py-4 flex flex-row gap-2 items-center">
                              <button
                                type="button"
                                onClick={() => handleEdit(item?.id_user)}
                                className="text-sm text-yellow-400 font-semibold"
                              >
                                <IoPencil size={20} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(item?.id_user)}
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
            <div className="w-full flex flex-col p-2">
              <div className="flex justify-end items-center relative">
                <button
                  type="button"
                  onClick={handleBackPage}
                  className="w-1/6 text-sm p-1 font-semibold shadow-sm rounded-full bg-yellow-500 hover:bg-yellow-400 text-white flex items-center justify-center gap-1"
                >
                  <IoArrowBack size={18} />
                  <span>Kembali</span>
                </button>
              </div>
              <div></div>
            </div>
            <form
              onSubmit={handleSubmitData}
              className="my-2 flex items-start justify-between w-full gap-3"
            >
              <div className="w-[40%] border p-2 flex flex-col rounded-md shadow-sm gap-3">
                <div className="flex flex-col items-center justify-center gap-2">
                  <img
                    src={imageSrc !== null ? imageSrc : ILDefaultIcon}
                    alt=""
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <input
                    type="file"
                    className={
                      "border rounded-e-md text-sm " +
                      (formError.foto && "border-red-500")
                    }
                    onChange={handleChangeImage}
                    accept="image/*"
                  />
                  {formError.foto && (
                    <p className="text-sm mt-1 text-red-500">
                      {formError.foto}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold">
                    Nama Lengkap :
                  </label>
                  <div className="flex flex-col">
                    <input
                      type="text"
                      className={
                        "border px-2 rounded-md text-sm py-1 " +
                        (formError.nama && "border-red-500")
                      }
                      placeholder="Ex: Muhammad Dival Maulana"
                      autoFocus={true}
                      value={formData.nama}
                      onChange={(e) =>
                        setFormData({ ...formData, nama: e.target.value })
                      }
                    />
                    {formError.nama && (
                      <p className="text-sm mt-1 text-red-500">
                        {formError.nama}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold">Email :</label>
                  <div className="flex flex-col">
                    <input
                      type="email"
                      className={
                        "border px-2 rounded-md text-sm py-1 " +
                        (formError.email && "border-red-500")
                      }
                      placeholder="Ex: example@gmail.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                    {formError.email && (
                      <p className="text-sm mt-1 text-red-500">
                        {formError.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold">Username :</label>
                  <div className="flex flex-col">
                    <input
                      type="text"
                      className={
                        "border px-2 rounded-md text-sm py-1 " +
                        (formError.username && "border-red-500")
                      }
                      placeholder="Ex: example19"
                      maxLength={20}
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                    />
                    {formError.username && (
                      <p className="text-sm mt-1 text-red-500">
                        {formError.username}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold">
                    Tempat Lahir :
                  </label>
                  <div className="flex flex-col">
                    <input
                      type="text"
                      className={
                        "border px-2 rounded-md text-sm py-1 " +
                        (formError.tempatLahir && "border-red-500")
                      }
                      placeholder="Ex: Palu"
                      value={formData.tempatLahir}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tempatLahir: e.target.value,
                        })
                      }
                    />
                    {formError.tempatLahir && (
                      <p className="text-sm mt-1 text-red-500">
                        {formError.tempatLahir}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-[60%] border p-2 flex flex-col rounded-md shadow-sm gap-3">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold">
                    Tanggal Lahir :
                  </label>
                  <div className="flex flex-col">
                    <input
                      type="date"
                      className={
                        "border px-2 rounded-md text-sm py-1 " +
                        (formError.tanggalLahir && "border-red-500")
                      }
                      value={formData.tanggalLahir}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tanggalLahir: e.target.value,
                        })
                      }
                    />
                    {formError.tanggalLahir && (
                      <p className="text-sm mt-1 text-red-500">
                        {formError.tanggalLahir}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold">Alamat :</label>
                  <div className="flex flex-col">
                    <textarea
                      className={
                        "border px-2 rounded-md text-sm py-1 " +
                        (formError.alamat && "border-red-500")
                      }
                      placeholder="Ex: Jl. Mulawarman"
                      value={formData.alamat}
                      onChange={(e) =>
                        setFormData({ ...formData, alamat: e.target.value })
                      }
                    ></textarea>
                    {formError.alamat && (
                      <p className="text-sm mt-1 text-red-500">
                        {formError.alamat}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold">
                    Jenis Kelamin :
                  </label>
                  <div className="flex flex-col">
                    <select
                      className={
                        "border px-2 rounded-md text-sm py-1 " +
                        (formError.jenisKelamin && "border-red-500")
                      }
                      value={formData.jenisKelamin}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          jenisKelamin: e.target.value,
                        })
                      }
                    >
                      <option value="">-- Pilih Gender --</option>
                      <option value="L">Laki-Laki</option>
                      <option value="P">Perempuan</option>
                    </select>
                    {formError.jenisKelamin && (
                      <p className="text-sm mt-1 text-red-500">
                        {formError.jenisKelamin}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold">No. Telpon :</label>
                  <div className="flex flex-col">
                    <input
                      type="tel"
                      className={
                        "border px-2 rounded-md text-sm py-1 " +
                        (formError.telpon && "border-red-500")
                      }
                      placeholder="Ex: 0812xxxxxxx"
                      maxLength={13}
                      value={formData.telpon}
                      onChange={(e) =>
                        setFormData({ ...formData, telpon: e.target.value })
                      }
                    />
                    {formError.telpon && (
                      <p className="text-sm mt-1 text-red-500">
                        {formError.telpon}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col">
                    <button
                      type="submit"
                      className="w-1/4 text-sm py-1 text-white bg-blue-500 hover:bg-blue-400 rounded-md shadow-sm border"
                    >
                      Simpan Data
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </Layouts>
  );
};

export default UserPage;
