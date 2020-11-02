import React, { useState } from "react";
import "../css/App.css";
import TotalStats from "./TotalStats.js";
import { Button } from "./utils/Button.js";
import CharacterView from "./SheetView.js";
import { PlayerStats } from "./utils/PlayerStatsContext";
import { useSelector, useDispatch } from 'react-redux';
import { loadSheet, selectSheet } from "../features/sheet/sheetSlice";
import { loadPage } from './utils/LoadPage.js'
const characterSheet1 = "CharacterSheet1";
const characterSheet2 = "CharacterSheet2";
const characterSheet3 = "CharacterSheet3";
const characterSheet4 = "CharacterSheet4";
const characterSheet5 = "CharacterSheet5";

const Sheet = () => {
  const dispatch = useDispatch();
  // console.log(page);
  // dispatch(loadSheet(page));
  const { sheet } = useSelector(selectSheet);
  // const importFn = (data) => {
  //     try {
  //         const importedData = JSON.parse(data);
  //         importedData.currentSheet = state.currentSheet;
  //         useDispatch(updateSheet(importedData))
  //     } catch (e) {
  //         console.log(e);
  //         return;
  //     }
  // // };
  // const savePage = () => {
  //   localStorage.setItem(sheet.name, JSON.stringify(sheet));
  // };
  // window.addEventListener("unload", savePage);


  const changePage = (dispatch, page) => {
    // savePage();
    const state = loadPage(page);
    dispatch(loadSheet(state));
  };
  console.log(sheet)
  return (
    <div className="section__App--row">
      <div className="section__navbar">
        <div className="section__App--column">
          <Button disabled={sheet.currentSheet === characterSheet1} onClick={() => changePage(dispatch, characterSheet1)}>
            Character Sheet 1
              </Button>
          <Button disabled={sheet.currentSheet === characterSheet2} onClick={() => changePage(dispatch, characterSheet2)}>
            Character Sheet 2
              </Button>
          <Button disabled={sheet.currentSheet === characterSheet3} onClick={() => changePage(dispatch, characterSheet3)}>
            Character Sheet 3
              </Button>
          <Button disabled={sheet.currentSheet === characterSheet4} onClick={() => changePage(dispatch, characterSheet4)}>
            Character Sheet 4
              </Button>
          <Button disabled={sheet.currentSheet === characterSheet5} onClick={() => changePage(dispatch, characterSheet5)}>
            Character Sheet 5
              </Button>
          {/* <Button onClick={() => comparePage()}>Compare</Button> */}
        </div>
      </div>
      {sheet.currentSheet ? (
        <PlayerStats>
          <div className="section__mainBody section__App--row">
            <CharacterView />
            <TotalStats />
          </div>
        </PlayerStats>
      ) : (
          <> </>
        )}
    </div>
  );
}

export default Sheet;
