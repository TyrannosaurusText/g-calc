import React, { useState } from "react";
import WeaponField from "./WeaponField.js";
import CharacterField from "./CharacterField.js";
import ArtifactsView from "./ArtifactsView.js";
import { Button } from "./utils/Button.js";
import DamageCalc from "./DamageField.js";
import "../css/SheetView.css";
import { selectSheet, updateSheet } from "../features/sheet/sheetSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { calcStats } from "../features/totalStats/totalStatsSlice.js";

const StatsView = "Stats";
const BuffView = "Buff";
const DamageView = "Damage Calc";
const ExportView = "Export";
// const validViews = [StatsView, BuffView, DamageView];

const StatsViewRender = (props) => (
  <>
    <div className="section__mainBody--row">
      <CharacterField {...props} />

      <WeaponField {...props} />
    </div>
    <ArtifactsView {...props} />
  </>
);
const BuffViewRender = (props) => <></>;
const DamageFieldNameRender = (props) => (
  <>
    <DamageCalc {...props} />
  </>
);
const Export = () => {
  const props = { ...(useSelector(selectSheet)) }
  const dispatch = useDispatch();
  const [textInput, setText] = useState('');
  return (
    <>
      <textarea
        key={props.currentSheet}
        className="body__textarea"
        onChange={(e) => {
          setText(e.target.value);
        }}
        defaultValue={textInput}
      />
      <div>
        <Button
          onClick={() => {
            try {
              const input = JSON.parse(textInput)
              input.currentSheet = props.currentSheet
              input.view = StatsView
              dispatch(updateSheet(input))
              dispatch(calcStats(input))
            }
            catch (e) {
              console.log(e)
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
            setText(JSON.stringify(props))
          }}
        >
          Export
      </Button>
      </div>
    </>
  );
};
const SheetView = () => {
  const props = { ...(useSelector(selectSheet)) }
  const dispatch = useDispatch();
  const setView = (dispatch, view) => {
    dispatch(updateSheet({ view: view }))
  }
  const currentView = props.view || StatsView;
  var obj = {
    [StatsView]: StatsViewRender(props),
    [BuffView]: BuffViewRender(props),
    [DamageView]: DamageFieldNameRender(props),
    [ExportView]: Export(props),
  };
  return (
    <div key={props.currentSheet} className="section__mainBody">
      <div className="section__mainBody--row">
        {Object.keys(obj).map((view) => (
          <Button disabled={props.view === view} key={view} onClick={() => setView(dispatch, view)}>
            {view}
          </Button>
        ))}
      </div>
      <div className="section__mainBody--column">
        {Object.keys(obj).map((view) =>
          currentView.localeCompare(view) === 0 ? (
            <div key={view}>{obj[view]}</div>
          ) : (
              <div key={view}></div>
            )
        )}
      </div>
    </div>
  );
};

export default SheetView;
