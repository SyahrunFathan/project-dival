import React, { useEffect, useState } from "react";
import Layouts from "..";
import { patchCountData } from "../../utils/apis";

const HomePage = () => {
  const [totalRs, setTotalRs] = useState(0);
  const [totalGraph, setTotalGraph] = useState(0);
  const [totalDarah, setTotalDarah] = useState(0);
  const [totalPengantaran, setTotalPengantaran] = useState(0);

  const countData = async () => {
    try {
      const response = await patchCountData();
      setTotalRs(response.data.totalRs);
      setTotalGraph(response.data.totalGraph);
      setTotalDarah(response.data.totalDarah);
      setTotalPengantaran(response.data.totalPengantaran);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    countData();
  }, []);
  return (
    <Layouts>
      <div className="flex justify-start items-center flex-wrap w-full gap-2">
        <div className="flex flex-col border w-[24.38%] h-24 justify-center items-start p-2 shadow-sm rounded-md">
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-col">
              <h1 className="text-sm font-semibold text-gray-400">Total</h1>
              <h1 className="text-lg font-semibold text-gray-600">
                Rumah Sakit
              </h1>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <h1 className="text-3xl font-semibold text-gray-600">
                {totalRs}
              </h1>
              <h1 className="text-sm font-semibold text-gray-400">Unit</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col border w-[24.38%] h-24 justify-center items-start p-2 shadow-sm rounded-md">
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-col">
              <h1 className="text-sm font-semibold text-gray-400">Total</h1>
              <h1 className="text-lg font-semibold text-gray-600">Graph</h1>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <h1 className="text-3xl font-semibold text-gray-600">
                {totalGraph}
              </h1>
              <h1 className="text-sm font-semibold text-gray-400">Unit</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col border w-[24.38%] h-24 justify-center items-start p-2 shadow-sm rounded-md">
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-col">
              <h1 className="text-sm font-semibold text-gray-400">Total</h1>
              <h1 className="text-lg font-semibold text-gray-600">Darah</h1>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <h1 className="text-3xl font-semibold text-gray-600">
                {totalDarah}
              </h1>
              <h1 className="text-sm font-semibold text-gray-400">Unit</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col border w-[24.38%] h-24 justify-center items-start p-2 shadow-sm rounded-md">
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-col">
              <h1 className="text-sm font-semibold text-gray-400">Total</h1>
              <h1 className="text-lg font-semibold text-gray-600">
                Pengantaran
              </h1>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <h1 className="text-3xl font-semibold text-gray-600">
                {totalPengantaran}
              </h1>
              <h1 className="text-sm font-semibold text-gray-400">Unit</h1>
            </div>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default HomePage;
