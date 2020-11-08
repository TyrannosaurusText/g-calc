import React from "react";
import "./NumberField.css";
var NumberField = (props) => {
  return (
    <input
      className="input__NumberField"
      type="number"
      key={props.defaultValue}
      defaultValue={props.defaultValue || 0}
      onBlur={(e) => {
        const value = parseFloat(e.target.value);
        props.onChange(isNaN(value) ? null : value);
      }}
    />
  );
};

var NumberFieldOnLine = (props) => (
  <>
    {props.name} <NumberField {...props} />
  </>
);

export { NumberField, NumberFieldOnLine };
