import React from "react";
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
import BuffInputField from "./BuffInputField.js";

const BuffName = "BuffName";
const BuffType = "BuffType";
const BuffValue = "BuffValue";
const BuffToggle = "BuffToggle";
const BuffTypeValue = [BuffType, BuffValue];
const BuffsField = () => {
  const props = { ...useSelector(selectSheet) };
  const dispatch = useDispatch();
  const updateType = updateSheetAndStatsType(dispatch);
  const updateValue = updateSheetAndStatsValue(dispatch);

  const buffEffectLength = props[BuffType] ? props[BuffType].length : 0;
  const onPassiveValueChange = arrayUpdater(BuffTypeValue, updateValue, props);
  const changePassiveType = sheetUpdater(BuffTypeValue, updateValue, props);
  const changePassiveValue = sheetUpdater(BuffTypeValue, updateType, props);
  const multifieldFields = [
    [changePassiveValue, BuffName],
    [changePassiveType, BuffType],
    [changePassiveValue, BuffValue, 0, onPassiveValueChange],
    [changePassiveValue, BuffToggle, true],
  ];
  return (
    <div>
      Buffs
      <div>
        <MultiField
          initialLength={buffEffectLength}
          buttonText="Add Buff"
          addEffect={multifieldAdd(props, multifieldFields)}
          removeEffect={multifieldRemove(props, multifieldFields)}
        >
          <TableComponent />
        </MultiField>
      </div>
    </div>
  );
};

const TableComponent = (tableProps) => {
  return (
    <table className="table__table">
      <thead>
        <tr>
          {["Buff Name", "Buff", "Buff Amount", "Active?"].map(
            (rowName, index) => (
              <th className="table__th" key={index}>
                {rowName}
              </th>
            )
          )}
          <th> {tableProps.add()} </th>
        </tr>
      </thead>
      <tbody>
        {tableProps.array.map((id, index) => {
          return BuffInputField({ id, index, remove: tableProps.remove });
        })}
      </tbody>
    </table>
  );
};

export default BuffsField;
