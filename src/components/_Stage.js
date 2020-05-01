import React, { useState } from "react";

import Task from "./Task";
import AddTask from "./AddTask";
import { Card, Button, InputGroup, Collapse } from "@blueprintjs/core";

const Stage = ({ name, stageId, tasks, onAddTask }) => {
   const [inputText, setInputText] = useState("");
   const stageTestId = `stage-${stageId}`;
   const addButtonTestId = `${stageTestId}-add-button`;
   const newTaskInputTestId = `${stageTestId}-new-task-input`;
   const newTaskInputConfirmTestId = `${stageTestId}-new-task-input-confirm`;
   const moveLeftButtonTestId = `${stageTestId}-move-left`;
   const moveRightButtonTestId = `${stageTestId}-move-right`;
   const deleteButtonTestId = `${stageTestId}-delete`;

   const taskList = tasks.map((task, idx) => <Task key={idx} name={task.taskText} />);

   return (
      <div data-testid={stageTestId} className='board'>
         <strong>{name}</strong>
         {taskList}
         <div className='add-task-form'>
            <form onSubmit={this.handleSubmit}>
               <input
                  type='text'
                  aria-label='Add a Task'
                  text='' //ref={this.taskInput}
               />
               <br />
               <Button
                  type='Submit'
                  text='Add Task'
                  onClick={(e) => {
                     e.preventDefault();
                     // bring the input text to App.js
                     onAddTask(taskName, stageId);
                  }}
               />
               <Button text='Cancel' onClick={this.setEditable(false)} />
            </form>
            {/* <AddTask
              stageId={stageId}
              addButtonTestId={addButtonTestId}
              onAddTask={(taskName, stageId) => onAddTask(taskName, stageId)}
           /> */}
         </div>
      </div>
   );
};

export default Stage;
