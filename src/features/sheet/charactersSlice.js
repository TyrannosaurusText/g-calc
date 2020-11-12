import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
const characters = "@allCharacters"
const initialState = () => {
  const data = localStorage.getItem(characters);
  if (data === null) {
    const newData = { names: ['Traveler'], UID: [uuidv4()] }
    localStorage.setItem(characters, JSON.stringify(newData))
    return newData;
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
      var { names, UID } = state;
      names.push(payload.name || "New Character")
      UID.push(uuidv4())
      state.names = names;
      state.UID = UID;
      localStorage.setItem(characters, JSON.stringify({ names: names, UID: UID }))
    },
    renameCharacter: (state, { payload }) => {
      state.names[payload.index] = payload.name;
      localStorage.setItem(characters, JSON.stringify({ names: state.names, UID: state.UID }))
    },
    deleteCharacter: (state, { payload }) => {
      var newNames = Array.from(state.names);
      var newUID = Array.from(state.UID);
      newNames.splice(payload.index, 1);
      newUID.splice(payload.index, 1);
      state.names = newNames;
      state.UID = newUID;
      localStorage.setItem(characters, JSON.stringify({ names: newNames, UID: newUID }))
    },
  },
});

export const {
  addNewCharacter,
  renameCharacter,
  deleteCharacter,
} = characterSlice.actions;
export const selectCharacters = (state) => state.characters;
export default characterSlice.reducer;
