import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import sheetReducer from '../features/sheet/sheetSlice';

export default configureStore({
  reducer: {
    // counter: counterReducer,
    sheet: sheetReducer,
  },
});
