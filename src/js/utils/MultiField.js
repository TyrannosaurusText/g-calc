import React from "react";

import { Button } from "./Button.js";
import "../../css/MultiField.css";

/**
 * props: initialLength, title, buttonText
 */
const addEffect = (props, name, mutator, value = undefined) => {
  var updatedProp = props[name];
  updatedProp.push(value);
  mutator(name)(updatedProp);
};
const removeEffect = (props, name, mutator, index) => {
  var updatedProp = props[name];
  updatedProp.splice(index, 1);
  mutator(name)(updatedProp);
};
class MultiField extends React.Component {
  constructor(props) {
    super(props);
    var initialLength = this.props.initialLength || 0;
    var fieldIDArray;
    fieldIDArray = Array(initialLength)
      .fill(0)
      .map((_, index) => index);
    this.state = {
      fieldIDArray: fieldIDArray,
      counter: fieldIDArray.length,
    };
  }

  AddEffect = () => {
    var ids = this.state.fieldIDArray;
    ids.push(this.state.counter);
    this.setState({
      fieldIDArray: ids,
      counter: this.state.counter + 1,
    });
    this.props.addEffect();
  };

  RemoveEffect = (index) => {
    var ids = this.state.fieldIDArray;
    ids.splice(index, 1);
    this.setState({ fieldIDArray: ids });
    this.props.removeEffect(index);
  };

  ComponentRenderer = (id, index, Component) => (
    <div key={id}>
      <Component id={id} index={index} />
      <Button onClick={() => this.RemoveEffect(index)}>Remove</Button>
    </div>
  );

  render = () => {
    return (
      <div>
        <div>
          {this.props.title || ""}
          <Button onClick={() => this.AddEffect()}>
            {this.props.buttonText || "Add"}
          </Button>
        </div>
        <div>
          <div
            className={
              this.state.fieldIDArray.length > 3
                ? "section__MultiField--scrollView"
                : "section__MultiField"
            }
          >
            {this.state.fieldIDArray
              ? this.state.fieldIDArray.map((id, index) => {
                  return this.ComponentRenderer(
                    id,
                    index,
                    this.props.component
                  );
                })
              : null}
          </div>
        </div>
      </div>
    );
  };
}

export { MultiField, addEffect, removeEffect };
