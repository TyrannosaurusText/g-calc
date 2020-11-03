import React, { useState } from "react";
import WeaponField from "./WeaponField.js";
import CharacterField from "./CharacterField.js";
import ArtifactsView from "./ArtifactsView.js";
import { avaliableFields } from "./Names.js";
import { Button } from "./utils/Button.js";
import DamageCalc from "./DamageField.js";
import "../css/SheetView.css";
import { selectSheet, updateSheet } from "../features/sheet/sheetSlice.js";
import { useDispatch, useSelector } from "react-redux";

const StatsView = "Stats";
const BuffView = "Buff";
const DamageView = "Damage Calc";
const ExportView = "Export";
// const validViews = [StatsView, BuffView, DamageView];

// var LoadComponent = (Component, fieldName) => (
//   <Component {...props[fieldName]} onChange={props.onchange(fieldName)} />
// );

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
const Export = (props) => {
  const keys = Object.keys(props).filter((key) =>
    avaliableFields.includes(key)
  );
  const data = {};
  keys.map((key) => (data[key] = props[key]));
  const [textInput, setText] = useState(JSON.stringify(data));
  return (
    <>
      <textarea
        className="body__textarea"
        onChange={(e) => {
          setText(e.target.value);
        }}
        defaultValue={textInput}
      />
      <div>
        <Button
          onClick={() => {
            props.import(textInput);
          }}
        >
          Import
      </Button>
      </div>
    </>
  );
};
const SheetView = () => {
  const props = { ...(useSelector(selectSheet)) }
  const [state, setState] = useState(props.view)
  const dispatch = useDispatch();
  const setView = (dispatch, view) => {
    setState(view);
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
    <div className="section__mainBody">
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
