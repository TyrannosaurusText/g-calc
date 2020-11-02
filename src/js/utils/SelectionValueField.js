import React, { Fragment } from "react";
import { longestArtifactName } from "./Effects.js";

var SelectionValueField = (props) => {
  var { onChange, array, component, defaultValue } = props;
  return (
    <span>
      <select
        tabIndex={-1}
        defaultValue={defaultValue}
        onChange={(e) => onChange(e.target.value, true)}
      >
        {array.map((arrayName) => {
          return (
            <option key={arrayName} value={arrayName}>
              {arrayName}
            </option>
          );
        })}
        <option hidden>{longestArtifactName}</option>
        {/* Just to keep selection field lengths consistent. */}
      </select>
      {component}
    </span>
  );
};

var hideIfFalsyOrNone = (val, component) => {
  return val === undefined || val === null || val.localeCompare("None") === 0 ? (
    <Fragment />
  ) : (
      component
    );
};

export { SelectionValueField, hideIfFalsyOrNone };
