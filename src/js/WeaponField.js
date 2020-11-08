import React from "react";
import { weaponSub, weaponPassives } from "./utils/Effects.js";
import "../css/WeaponField.css";
import {
  SelectionValueField,
  hideIfFalsyOrNone,
} from "./utils/SelectionValueField.js";
import { NumberField, NumberFieldOnLine } from "./utils/NumberField.js";
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

const weaponPassivesType = "weaponPassivesType";
const weaponPassivesValue = "weaponPassivesValue";
const weaponSubstatType = "weaponSubstatType";
const weaponSubstatValue = "weaponSubstatValue";

const WeaponField = () => {
  const props = { ...useSelector(selectSheet) };
  const dispatch = useDispatch();
  const updateType = updateSheetAndStatsType(dispatch);
  const updateValue = updateSheetAndStatsValue(dispatch);
  const weaponPassiveTypeValue = [weaponPassivesType, weaponPassivesValue];
  const weaponPassiveLength = props.weaponPassivesType
    ? props.weaponPassivesType.length
    : 0;
  const onPassiveValueChange = arrayUpdater(
    weaponPassiveTypeValue,
    updateValue,
    props
  );

  const changePassiveType = sheetUpdater(
    weaponPassiveTypeValue,
    updateValue,
    props
  );
  const changePassiveValue = sheetUpdater(
    weaponPassiveTypeValue,
    updateType,
    props
  );
  const multifieldFields = [
    [changePassiveType, weaponPassivesType],
    [changePassiveValue, weaponPassivesValue, 0, onPassiveValueChange],
  ];
  const weaponSubstatInputComponent = hideIfFalsyOrNone(
    props[weaponSubstatType],
    <NumberFieldOnLine
      onChange={updateValue(
        props[weaponSubstatType],
        props[weaponSubstatValue],
        weaponSubstatValue
      )}
      defaultValue={props[weaponSubstatValue]}
    />
  );
  return (
    <div>
      Weapon Substat
      <table className="table__table">
        {/* <thead className="table__th">
          <tr>
            <th> Weapon Substat </th>
            <th></th>
          </tr>
        </thead> */}
        <tbody className="table__td">
          <tr>
            <td>
              <SelectionValueField
                array={weaponSub}
                onChange={updateType(
                  props[weaponSubstatType],
                  props[weaponSubstatValue],
                  weaponSubstatType
                )}
                defaultValue={props[weaponSubstatType]}
              />
            </td>
            <td>{weaponSubstatInputComponent}</td>
          </tr>
        </tbody>
      </table>
      <MultiField
        initialLength={weaponPassiveLength}
        title="Weapon Passive"
        buttonText="Add Passive"
        component={WeaponPassiveInput}
        addEffect={multifieldAdd(props, multifieldFields)}
        removeEffect={multifieldRemove(props, multifieldFields)}
      >
        <TableComponent />
      </MultiField>
    </div>
  );
};
const TableComponent = (tableProps) => {
  return (
    <div  style={{ overflowY: "scroll", "maxHeight": "178px", 'border': '1px solid white' }}>
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
            return WeaponPassiveInput({ id, index, remove: tableProps.remove });
          })}
        </tbody>
      </table>
    </div>
  );
};

const WeaponPassiveInput = ({ id, index, remove }) => {
  const dispatch = useDispatch();
  const props = useSelector(selectSheet);
  const updateType = updateSheetAndStatsType(dispatch);
  const updateValue = updateSheetAndStatsValue(dispatch);
  const weaponPassiveTypeValue = [weaponPassivesType, weaponPassivesValue];
  const onPassiveValueChange = arrayUpdater(
    weaponPassiveTypeValue,
    updateValue,
    props
  );
  const onPassiveTypeChange = arrayUpdater(
    weaponPassiveTypeValue,
    updateType,
    props
  );
  const weaponPassiveInputComponent = (
    <>
      {hideIfFalsyOrNone(
        props[weaponPassivesType][index],
        <NumberField
          onChange={onPassiveValueChange(weaponPassivesValue, index)}
          defaultValue={props[weaponPassivesValue][index]}
        />
      )}
    </>
  );
  return (
    <tr key={id}>
      <td>
        <SelectionValueField
          selectionName={weaponPassivesType}
          onChange={onPassiveTypeChange(weaponPassivesType, index)}
          array={weaponPassives}
          defaultValue={props[weaponPassivesType][index]}
        />
      </td>
      <td>{weaponPassiveInputComponent}</td>
      <td>{remove(index)}</td>
    </tr>
  );
};

export default WeaponField;
