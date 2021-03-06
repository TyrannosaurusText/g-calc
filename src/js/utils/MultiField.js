import React from "react";

import { Button } from "./Button.js";
import "../../css/MultiField.css";

/**
 * props: initialLength, title, buttonText, addEffect, removeEffect
 */

const multifieldAdd = (props, array) => () => {
  const add = (mutator, name, value = undefined) => {
    const updater = mutator(name);
    updater(props[name].concat(value));
  };
  array.forEach((args) => {
    add(...args);
  });
};
const multifieldRemove = (props, array) => (index) => {
  const remove = (mutator, name, value, sheetUpdater = () => () => {}) => {
    const updater = mutator(name);
    var newState = [...props[name]];
    newState.splice(index, 1);
    sheetUpdater(name, index)(0);
    updater(newState);
  };
  array.forEach((args) => {
    remove(...args);
  });
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
      <div
        className={this.props.wrapperClass || "section__MultiField--spacing"}
      >
        <Component id={id} index={index} />
        <Button onClick={() => this.RemoveEffect(index)}>Remove</Button>
      </div>
    </div>
  );
  render = () => {
    return (
      <>
        {this.props.children ? (
          React.cloneElement(this.props.children, {
            key: this.state.fieldIDArray.length,
            className:
              this.state.fieldIDArray.length > 3
                ? "section__MultiField--scrollView"
                : "section__MultiField",
            array: this.state.fieldIDArray,
            remove: (index) => (
              <Button onClick={() => this.RemoveEffect(index)}>Remove</Button>
            ),
            add: () => (
              <Button onClick={() => this.AddEffect()}>
                {this.props.buttonText || "Add"}
              </Button>
            ),
          })
        ) : (
          <div>
            <div>
              {this.props.title || ""}
              <Button onClick={() => this.AddEffect()}>
                {this.props.buttonText || "Add"}
              </Button>
            </div>
            <div
              key={this.state.fieldIDArray.length}
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
        )}
      </>
    );
  };
}

export { MultiField, multifieldAdd, multifieldRemove };
