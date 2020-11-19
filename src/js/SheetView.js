import React, { useState } from "react";
import WeaponField from "./WeaponField.js";
import CharacterField from "./CharacterField.js";
import BuffsField from "./BuffsField.js";
import ArtifactsView from "./ArtifactsView.js";
import { Button } from "./utils/Button.js";
import DamageCalc from "./DamageField.js";
import "../css/SheetView.css";
import { selectSheet, updateSheet } from "../features/sheet/sheetSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { calcStats } from "../features/totalStats/totalStatsSlice.js";
import { deleteCharacter, renameCharacter, selectCharacters } from "../features/sheet/charactersSlice.js";

const StatsView = "Stats";
const DamageView = "Damage Calc";
const ExportView = "Export";

const StatsViewRender = () => (
  <>
    <div className="section__mainBody--row">
      <CharacterField />
      <WeaponField />
      <ArtifactsView />
    </div>
    <BuffsField />
  </>
);
// const BuffViewRender = () => ;
const DamageFieldNameRender = () => <DamageCalc />;
const Export = () => {
  const props = { ...useSelector(selectSheet) };
  const characters = { ...useSelector(selectCharacters) };
  const dispatch = useDispatch();
  const [textInput, setText] = useState("");
  const [deleteText, updateDelete] = useState("Delete Sheet");
  return (
    <>
      <div style={{ display: 'flex' }}>
        <textarea
          key={props.currentSheet}
          className="body__textarea"
          onChange={(e) => {
            setText(e.target.value);
          }}
          defaultValue={textInput}
        />
        <div>
          <div>
            <Button
              onClick={() => {
                try {
                  const input = JSON.parse(textInput);
                  input.currentSheet = props.currentSheet;
                  input.view = StatsView;
                  dispatch(updateSheet(input));
                  dispatch(calcStats(input));
                } catch (e) {
                  console.log(e);
                }
              }}
            >
              Import
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                props.currentSheet = undefined;
                props.view = undefined;
                props.index = undefined;
                setText(JSON.stringify(props));
              }}
            >
              Export
            </Button>
          </div>
        </div>
      </div>
      <Button className="Delete"
        onBlur={() => {
          updateDelete('Delete Sheet')
        }}
        onClick={() => {
          if (deleteText.localeCompare("Delete Sheet") === 0) {
            updateDelete('Confirm?')
          }
          else {
            const index = props.index;
            const UID = characters.UID[index];
            dispatch(updateSheet({ currentSheet: undefined, index: undefined }));
            dispatch(deleteCharacter({ index: index }));
            localStorage.removeItem(UID)
          }
        }}>{deleteText}</Button>
    </>
  );
};
const SheetView = () => {
  const props = { ...useSelector(selectSheet) };
  const dispatch = useDispatch();
  const setView = (dispatch, view) => {
    dispatch(updateSheet({ view: view }));
  };
  const currentView = props.view || StatsView;
  var obj = {
    [StatsView]: StatsViewRender(),
    [DamageView]: DamageFieldNameRender(),
    [ExportView]: Export(),
  };
  return (
    <div key={props.currentSheet} className="section__mainBody">
      <div className="section__mainBody">
        {Object.keys(obj).map((view) =>
          currentView.localeCompare(view) === 0 ? (
            <div key={view}>
              <div>
                <input
                  type={"text"}
                  defaultValue={props.currentSheet}
                  onBlur={(e) => {
                    dispatch(
                      renameCharacter({
                        index: props.index,
                        name: e.target.value,
                      })
                    );
                    dispatch(updateSheet({ currentSheet: e.target.value }));
                  }}
                ></input>
                {Object.keys(obj).map((view) => (
                  <Button
                    disabled={props.view === view}
                    key={view}
                    onClick={() => setView(dispatch, view)}
                  >
                    {view}
                  </Button>
                ))}
              </div>
              {obj[view]}
            </div>
          ) : (
              null
            )
        )}
      </div>
    </div>
  );
};

export default SheetView;
