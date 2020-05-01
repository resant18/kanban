import React, { useState } from "react";

import Task from "./Task";
import AddTask from "./AddTask";
import { Card, Button, InputGroup, Collapse } from "@blueprintjs/core";

const Stage = ({ name, stageId, tasks, onAddTask }) => {
  const [inputTask, setInputTask] = useState("");
  const [textVisibility, setTextVisibility] = useState(false);
  const stageTestId = `stage-${stageId}`;
  const addButtonTestId = `${stageTestId}-add-button`;
  const newTaskInputTestId = `${stageTestId}-new-task-input`;
  const newTaskInputConfirmTestId = `${stageTestId}-new-task-input-confirm`;
  const moveLeftButtonTestId = `${stageTestId}-move-left`;
  const moveRightButtonTestId = `${stageTestId}-move-right`;
  const deleteButtonTestId = `${stageTestId}-delete`;

  const taskList = tasks.map((task, idx) => (
     <div>
        <Task key={idx} name={task.taskText} />
        <Button data-testid={deleteButtonTestId} text='X' />
     </div>
  ));  

  const handleAddTask = e => {
     e.preventDefault();     
     onAddTask(inputTask, stageId);
     setTextVisibility(false);     
  }

  return (
     <div data-testid={stageTestId} className='board'>
        <strong>{name}</strong>
        {taskList}
        {textVisibility ? (
           <div className='add-task-form'>
              <form onSubmit={this.handleSubmit}>
                 <input
                    data-testid={newTaskInputTestId}
                    type='text'
                    aria-label='Add a Task'
                    name='inputTask'
                    onChange={(e) => setInputTask(e.target.value)}
                 />
                 <br />
                 <Button
                    data-testid={addButtonTestId}
                    type='Submit'
                    name='inputTask'
                    text='Add Task'
                    onClick={handleAddTask}
                 />
                 <Button text='Cancel' onClick={(e) => setTextVisibility(false)} />
              </form>
           </div>
        ) : (
           <div>
              <Button text='Add a Task' onClick={(e) => setTextVisibility(true)} />
              
              <div>
               <Button data-testid={moveLeftButtonTestId} text='<<' />
               <Button data-testid={moveRightButtonTestId} text='>>' />
              </div>
           </div>
        )}
     </div>
  );
};

export default Stage;
