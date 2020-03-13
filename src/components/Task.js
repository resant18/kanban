import React from "react";
import { Callout, Card, Button } from "@blueprintjs/core";

const SELECTED_COLOR = "#106ba3";
const Task = ({ name }) => {
  const taskTestId = `task-${name.split(" ").join("-")}`;
    
  return (
    <div data-testid={taskTestId}></div>
  );
};

export default Task;
