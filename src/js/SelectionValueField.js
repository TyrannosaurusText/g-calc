import React from "react";

var SelectionValueField = (
  array,
  key,
  onChange,
  inputField,
  value,
  hideable = true
) => {
  return (
    <div key={key}>
      <select id={key} onChange={onChange(key)}>
        {array.map((name) => {
          return (
            <option key={name} value={name}>
              {name}
            </option>
          );
        })}
      </select>{" "}
      {true === hideable && value === undefined ? <></> : <>{inputField}</>}
    </div>
  );
};

export { SelectionValueField };
