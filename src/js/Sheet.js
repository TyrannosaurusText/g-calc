import React, { useEffect } from "react";
import "../css/App.css";
import TotalStats from "./TotalStats.js";
import { Button } from "./utils/Button.js";
import CharacterView from "./SheetView.js";
import { useSelector, useDispatch } from "react-redux";
import { loadSheet, selectSheet } from "../features/sheet/sheetSlice";
import {
  addNewCharacter,
  selectCharacters,
} from "../features/sheet/charactersSlice";
import { loadPage } from "./utils/LoadPage.js";
import { calcStats } from "../features/totalStats/totalStatsSlice";

const Sheet = () => {
  const dispatch = useDispatch();
  const sheet = useSelector(selectSheet);
  const characters = useSelector(selectCharacters);
  const savePage = () => {
    if (characters.UID[sheet.index] !== undefined) {
      localStorage.setItem(characters.UID[sheet.index], JSON.stringify(sheet));
    }
  };
  useEffect(() => {
    window.addEventListener("unload", savePage);
    changePage(dispatch, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const changePage = (dispatch, index) => {
    savePage();
    const state = loadPage(characters.UID[index]);
    state.currentSheet = characters.names[index];
    state.index = index;
    dispatch(loadSheet(state));
    dispatch(calcStats(state));
  };
  return (
    <div className="section__App--row">
      <div className="section__navbar">
        <div className="section__App--column">
          {characters.names.map((key, index) => {
            return (
              <Button
                style={{ width: "-webkit-fill-available" }}
                key={characters.UID[index]}
                disabled={sheet.index === key}
                onClick={() => changePage(dispatch, index)}
              >
                {key}
              </Button>
            );
          })}
          <Button
            onClick={() => {
              dispatch(addNewCharacter({}));
            }}
          >
            Add New Sheet
          </Button>
        </div>
      </div>
      {sheet.currentSheet ? (
        <div className="section__mainBody section__App--row">
          <CharacterView />
          <TotalStats />
        </div>
      ) : (
          <> </>
        )}
    </div>
  );
};

export default Sheet;
