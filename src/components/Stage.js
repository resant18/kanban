import React, { useState } from "react";

import Task from "./Task";
import { Card, Button, InputGroup, Collapse } from "@blueprintjs/core";
import "./Stage.css";

let selectedTasks = [];
const Stage = ({ name, stageId, tasks, onDeleteTask, onAddTask, onMoveSelectedTask }) => {
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
      <div key={idx} className='taskItem' onClick={(e) => handleSelectedTask({idx, stageId}) } >
         <Task name={task.taskText} />         
         <Button data-testid={deleteButtonTestId} text='X' onClick={(e) => handleDeleteTask(idx, stageId)} />         
      </div>
   ));

   const handleSelectedTask = (selectedTask) => {                   
      let id = -1;
      for (let idx = 0; idx < selectedTasks.length; idx++) {         
         let task = selectedTasks[idx];
         if (task.idx === selectedTask.idx && task.stageId === selectedTask.stageId) {         
            selectedTasks.splice(idx, 1);
            id = idx;     
            break;       
         }
      }
      
      if (id === -1) selectedTasks.push({...selectedTask});
      console.log(selectedTasks);
   };

   const handleDeleteTask = (taskId, stageId) => {  
      console.log('delete')    
      onDeleteTask(taskId, stageId);
   };

   const handleAddTask = (e) => {
      console.log('add');
      e.preventDefault();
      onAddTask(inputTask, stageId);
      setTextVisibility(false);
   };

   return (
      <div data-testid={stageTestId} className='board'>
         <div class='stage-title'>{name}</div>
         <div className='top'>{taskList}</div>
         <div className='bottom'>
            {textVisibility ? (
               <div className='add-task-form'>
                  <form>
                     <InputGroup
                        data-testid={newTaskInputTestId}
                        type='text'
                        aria-label='Add a Task'
                        placeholder='Task Description'
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
                     {stageId > 0 ? (
                        <Button
                           data-testid={moveLeftButtonTestId}
                           text='<<'
                           onClick={(e) => {
                              onMoveSelectedTask(selectedTasks, stageId, "left");
                              selectedTasks = [];
                           }}
                        />
                     ) : null}
                     {stageId < 3 ? (
                        <Button
                           data-testid={moveRightButtonTestId}
                           text='>>'
                           onClick={(e) => {
                              onMoveSelectedTask(selectedTasks, stageId, "right");
                              selectedTasks = [];
                           }}
                        />
                     ) : null}
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default Stage;


