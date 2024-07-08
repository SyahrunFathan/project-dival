import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../Features/authSlice';
import pengantaranSlice from '../Features/pengantaranSlice';

export default store = configureStore({
  reducer: {
    auth: authSlice,
    pengantaran: pengantaranSlice,
  },
  devTools: true,
});
