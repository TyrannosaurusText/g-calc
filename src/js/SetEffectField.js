import React from "react";
import { setEffects } from "./utils/Effects.js";
import {
  SelectionValueField,
  hideIfFalsyOrNone,
} from "./utils/SelectionValueField.js";
import { NumberFieldOnLine } from "./utils/NumberField.js";
import { selectSheet } from "../features/sheet/sheetSlice.js";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSheetAndStatsType,
  updateSheetAndStatsValue,
  arrayUpdater,
  sheetUpdater,
} from "./utils/updaters.js";
import {
  MultiField,
  multifieldAdd,
  multifieldRemove,
} from "./utils/MultiField.js";
import "../css/SetEffectField.css";
const artifactSetEffectType = "artifactTypes-5";
const artifactSetEffectValue = "artifactValues-5";

const SetEffectField = () => {
  const props = { ...useSelector(selectSheet) };
  const dispatch = useDispatch();
  const updateType = updateSheetAndStatsType(dispatch);
  const updateValue = updateSheetAndStatsValue(dispatch);

  const artifactSetEffectLength = props[artifactSetEffectType]
    ? props[artifactSetEffectType].length
    : 0;
  const artifactSetEffectTypeValue = [
    artifactSetEffectType,
    artifactSetEffectValue,
  ];
  const onPassiveValueChange = arrayUpdater(
    artifactSetEffectTypeValue,
    updateValue,
    props
  );
  const onPassiveTypeChange = arrayUpdater(
    artifactSetEffectTypeValue,
    updateType,
    props
  );
  const artifactSetEffectInputComponent = ({ id, index, remove }) => {
    const PassiveInputComponent = (
      <>
        {hideIfFalsyOrNone(
          props[artifactSetEffectType][index],
          <NumberFieldOnLine
            onChange={onPassiveValueChange(artifactSetEffectValue, index)}
            defaultValue={props[artifactSetEffectValue][index]}
          />
        )}
      </>
    );
    return (
      <tr key={id}>
        <td>
          <SelectionValueField
            selectionName={artifactSetEffectType}
            onChange={onPassiveTypeChange(artifactSetEffectType, index)}
            array={setEffects}
            defaultValue={props[artifactSetEffectType][index]}
          />
        </td>
        <td>{PassiveInputComponent}</td>
        <td>{remove(index)}</td>
      </tr>
    );
  };
  const changePassiveType = sheetUpdater(
    artifactSetEffectTypeValue,
    updateValue,
    props
  );
  const changePassiveValue = sheetUpdater(
    artifactSetEffectTypeValue,
    updateType,
    props
  );
  const multifieldFields = [
    [changePassiveType, artifactSetEffectType],
    [changePassiveValue, artifactSetEffectValue, 0, onPassiveValueChange],
  ];
  const TableComponent = (tableProps) => {
    return (
      <div
        style={{
          overflowY: "scroll",
          "max-height": "194px",
          border: "1px solid white",
        }}
      >
        <table className="table__table">
          <thead>
            <tr>
              {["Type", "Value"].map((rowName, index) => (
                <th className="table__th" key={index}>
                  {rowName}
                </th>
              ))}
              <th> {tableProps.add()} </th>
            </tr>
          </thead>
          <tbody>
            {tableProps.array.map((id, index) => {
              return artifactSetEffectInputComponent({
                id,
                index,
                remove: tableProps.remove,
              });
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <MultiField
        initialLength={artifactSetEffectLength}
        title="Passive Set Effects"
        buttonText="Add Passive"
        wrapperClass="setEffect--multifield"
        addEffect={multifieldAdd(props, multifieldFields)}
        removeEffect={multifieldRemove(props, multifieldFields)}
      >
        <TableComponent />
      </MultiField>
    </div>
  );
};

export default SetEffectField;
