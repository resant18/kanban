import React, { useState } from "react";

import Task from "./Task";
import { Card, Button, InputGroup, Collapse } from "@blueprintjs/core";
import "./Stage.css";

const Stage = ({ name, stageId, tasks, onAddTask, onDeleteTask }) => {
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
     <div className="taskItem">
        <Task key={idx} name={task.taskText} />
        <Button
           key={idx}
           data-testid={deleteButtonTestId}
           text='X'
           onClick={(e) => handleDeleteTask(idx, stageId)}         
        />
     </div>
  ));  

  const handleAddTask = e => {
     e.preventDefault();     
     onAddTask(inputTask, stageId);
     setTextVisibility(false);     
  }

  const handleDeleteTask = (taskId, stageId) => {                     
      onDeleteTask(taskId, stageId);          
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
                    text='Add'
                    onClick={handleAddTask}
                 />
                 <Button text='Cancel' onClick={(e) => setTextVisibility(false)} />
              </form>
           </div>
        ) : (
           <div>
              <Button text='Add a Task' onClick={(e) => setTextVisibility(true)} />              
              <div>
                 {
                    stageId > 0 ?
                     <Button data-testid={moveLeftButtonTestId} text='<<' />
                     :
                     null
                 }
                 {
                    stageId < 3 ?
                     <Button data-testid={moveRightButtonTestId} text='>>' />
                     :
                     null
                 }                              
              </div>
           </div>
        )}
     </div>
  );
};

export default Stage;


