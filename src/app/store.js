import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import sheetReducer from '../features/sheet/sheetSlice';
import totalStatsReducer from '../features/totalStats/totalStatsSlice';
export default configureStore({
  reducer: {
    counter: counterReducer,
    sheet: sheetReducer,
    stats: totalStatsReducer,
  },
});
