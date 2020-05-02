import React, { useState } from "react";
import { Callout, Card, Button } from "@blueprintjs/core";

const SELECTED_COLOR = "#106ba3";
const Task = ({ name }) => {
  const taskTestId = `task-${name.split(" ").join("-")}`;
  const [isSelected, setIsSelected] = useState(false);
    
  return (
     <div
        data-testid={taskTestId}
        style={{ backgroundColor: isSelected ? SELECTED_COLOR : "#ffffff" }}
        onClick={(e) => setIsSelected(!isSelected)}
     >
        {name}
     </div>
  );
};

export default Task;
