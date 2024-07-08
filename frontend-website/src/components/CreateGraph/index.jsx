import React from "react";
import { IoBackspace, IoSaveOutline } from "react-icons/io5";

const CreateGraph = ({
  handleClickBack,
  formData,
  formError,
  setFormData,
  handleSubmit,
  result,
}) => {
  return (
    <div className="border w-[55%] flex flex-col p-2 rounded-md shadow">
      <div className="flex justify-between items-center relative">
        <div>
          <h3 className="text-lg font-semibold text-blue-500">Tambah Data</h3>
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
            <label htmlFor="mulai" className="font-semibold">
              Mulai
            </label>
            <input
              type="text"
              className="border py-1 mt-2 rounded-md shadow-sm px-2"
              id="mulai"
              value={"PMI Provinsi Sulawesi Tengah"}
              disabled
            />
          </div>
          <div className="flex flex-col relative mt-2 mb-3">
            <label htmlFor="tujuan" className="font-semibold">
              Tujuan
            </label>
            <select
              id="tujuan"
              className={
                "border py-1 mt-2 rounded-md shadow-sm px-2 " +
                (formError && "border-red-500")
              }
              value={formData}
              onChange={(e) => setFormData(e.target.value)}
            >
              <option value="">-- Pilih Tujuan --</option>
              {result.map((item, index) => (
                <option value={item?.id_rs} key={index}>
                  {item?.nama_rs}
                </option>
              ))}
            </select>
            {formError && <p className="text-sm text-red-500">{formError}</p>}
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

export default CreateGraph;
