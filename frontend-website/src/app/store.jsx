import { configureStore } from "@reduxjs/toolkit";
import rumahSakitSlice from "../features/rumahSakitSlice";
import graphSlice from "../features/graphSlice";
import darahSlice from "../features/darahSlice";
import pengantaranSlice from "../features/pengantaranSlice";
import userSlice from "../features/userSlice";

export default configureStore({
  reducer: {
    rs: rumahSakitSlice,
    graph: graphSlice,
    darah: darahSlice,
    pengantaran: pengantaranSlice,
    userSlice: userSlice,
  },
  devTools: true,
});
