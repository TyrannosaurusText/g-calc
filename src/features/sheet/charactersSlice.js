import { createSlice } from "@reduxjs/toolkit";

const initialState = () => {
  const data = localStorage.getItem("@allCharacters");
  console.log("hi", data);
  if (data === null) {
    return { names: [] };
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    console.log("Could not read from localstorage");
  }
};

export const characterSlice = createSlice({
  name: "characters",
  initialState: initialState(),
  reducers: {
    addNewCharacter: (state, { payload }) => {
      var newState = Array.from(state.names);
      newState.push(payload.name || "New Character");
      state.names = newState;
      console.log(newState);

    },
    renameCharacter: (state, { payload }) => {
      state.names[payload.index] = payload.name;
    },
    deleteCharacter: (state, { payload }) => {
      var newState = Array.from(state.names);
      newState.splice(payload.index, 1);
      state.names = newState;
    },
  },
});

export const {
  addNewCharacter,
  renameCharacter,
  deleteCharacter,
} = characterSlice.actions;
export const selectCharacters = (state) => state.characters.names;
export default characterSlice.reducer;
