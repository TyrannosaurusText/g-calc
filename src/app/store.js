import { configureStore } from "@reduxjs/toolkit";
import sheetReducer from "../features/sheet/sheetSlice";
import charactersReducer from "../features/sheet/charactersSlice";
import totalStatsReducer from "../features/totalStats/totalStatsSlice";
export default configureStore({
  reducer: {
    characters: charactersReducer,
    sheet: sheetReducer,
    stats: totalStatsReducer,
  },
});
