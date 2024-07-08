import React from "react";
import { IoBackspace, IoSaveOutline } from "react-icons/io5";

const UpdateRumahSakit = ({
  handleClickBack,
  formData,
  setFormData,
  formError,
  handleSubmit,
}) => {
  return (
    <div className="border w-[55%] flex flex-col p-2 rounded-md shadow">
      <div className="flex justify-between items-center relative">
        <div>
          <h3 className="text-lg font-semibold text-blue-500">Edit Data</h3>
        </div>
        <button
          type="button"
          onClick={handleClickBack}
          className="w-1/3 text-sm p-1 font-semibold shadow-sm rounded-full bg-yellow-500 hover:bg-yellow-400 text-white flex items-center justify-center gap-1"
        >
          <IoBackspace size={18} />
          <span>Kembali</span>
        </button>
      </div>
      <div className="flex flex-col mb-2 mt-2">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col relative mt-2 mb-3">
            <label htmlFor="namaRs" className="font-semibold">
              Nama Rumah Sakit :
            </label>
            <input
              type="text"
              className={
                "border py-1 mt-2 rounded-md shadow-sm px-2 " +
                (formError?.namaRs && "border-red-500")
              }
              placeholder="Masukkan Nama Rumah Sakit"
              id="namaRs"
              value={formData?.namaRs}
              onChange={(e) =>
                setFormData({ ...formData, namaRs: e.target.value })
              }
            />
            {formError?.namaRs && (
              <p className="text-sm text-red-500">{formError?.namaRs}</p>
            )}
          </div>
          <div className="flex items-center justify-start relative mt-2 mb-3 gap-2">
            <div className="flex flex-col relative w-[50%]">
              <label htmlFor="latitude" className="font-semibold">
                Latitude :
              </label>
              <input
                type="text"
                className={
                  "border py-1 mt-2 rounded-md shadow-sm px-2 " +
                  (formError?.latitude && "border-red-500")
                }
                placeholder="0"
                id="latitude"
                readOnly
                disabled
                value={formData?.latitude}
              />
              {formError?.latitude && (
                <p className="text-sm text-red-500">{formError?.latitude}</p>
              )}
            </div>
            <div className="flex flex-col relative w-[50%]">
              <label htmlFor="longitude" className="font-semibold">
                Longitude :
              </label>
              <input
                type="text"
                className="border py-1 mt-2 rounded-md shadow-sm px-2"
                placeholder="0"
                id="longitude"
                readOnly
                disabled
                value={formData?.longitude}
              />
            </div>
          </div>
          <div className="flex flex-col relative mt-2 mb-3">
            <label htmlFor="deskripsi" className="font-semibold">
              Deskripsi :
            </label>
            <textarea
              id="deskripsi"
              maxLength={100}
              className="border py-1 mt-2 rounded-md shadow-sm px-2"
              placeholder="Masukkan Deskripsi Singkat"
              value={formData?.deskripsi}
              onChange={(e) =>
                setFormData({ ...formData, deskripsi: e.target.value })
              }
            ></textarea>
          </div>
          <div className="flex flex-col relative mt-2 mb-3">
            <button
              type="submit"
              className="w-1/3 border shadow-sm font-semibold gap-2 rounded-md bg-blue-500 text-white justify-center items-center flex py-1 hover:bg-blue-400"
            >
              <IoSaveOutline size={18} />
              Simpan Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRumahSakit;
