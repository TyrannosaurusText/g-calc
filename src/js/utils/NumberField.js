import React from "react";
import "./NumberField.css";
var NumberField = (props) => {
  return (
    <input
      className={props.className || "item__fillWidth"}
      type="number"
      key={props.defaultValue}
      defaultValue={props.defaultValue === undefined ? '' : props.defaultValue}
      onBlur={(e) => {
        var value = parseFloat(e.target.value);
        if (props.minValue) value = Math.max(value, props.minValue)
        if (props.maxValue) value = Math.min(value, props.maxValue)
        e.target.value = value;
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
