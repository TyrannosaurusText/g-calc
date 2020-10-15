import React from "react";

var SelectionValueField = (
  array,
  key,
  onChange,
  inputField,
  intialValue,
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
        <option hidden>Elemental Mastery</option>
        {/* Just to match length of the subfields lol. */}
      </select>{" "}
      {true === hideable && intialValue === undefined ? <></> : <>{inputField}</>}
    </div>
  );
};

export { SelectionValueField };
