import React, { useState } from "react";

import Task from "./Task";
import AddTask from "./AddTask";
import { Card, Button, InputGroup, Collapse } from "@blueprintjs/core";

const Stage = ({ name, stageId, tasks, onAddTask }) => {
  const stageTestId = `stage-${stageId}`;
  const addButtonTestId = `${stageTestId}-add-button`;
  const newTaskInputTestId = `${stageTestId}-new-task-input`;
  const newTaskInputConfirmTestId = `${stageTestId}-new-task-input-confirm`;
  const moveLeftButtonTestId = `${stageTestId}-move-left`;
  const moveRightButtonTestId = `${stageTestId}-move-right`;
  const deleteButtonTestId = `${stageTestId}-delete`;

  const taskList = tasks.map( (task, idx) =>  (    
    <Task key={idx} name={task.taskText} />
  ))



  return (
     <div data-testid={stageTestId} className='board'>
        {name}
        {taskList}
        <div className='add-task-form'>
           <AddTask stageId={stageId} addButtonTestId={addButtonTestId} onAddTask={(taskName, stageId) => onAddTask(taskName, stageId)} />           
        </div>
     </div>
  );
};

export default Stage;
