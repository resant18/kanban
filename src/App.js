/* Following this tutorial: https://medium.com/@jtonti/basic-kanban-board-in-react-593b14300a74
https://codesandbox.io/s/r7p22n88mm
*/
import React, { Component } from "react";
import { Card, Button, InputGroup } from "@blueprintjs/core";

import "./App.css";
import Stage from "./components/Stage";

export const NUM_STAGES = 4;
export const STAGE_NAMES = ["Backlog", "To Do", "Ongoing", "Done"];       

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stages : [
        {
          stageId: 0,
          name: "Backlog",
          tasks: [{            
            taskText: "Task 1"
          }, {            
            taskText: "Task 2"
          }]
        },
        {
          stageId: 1,
          name: "To Do",
          tasks: [{            
            taskText: "Task 3"
          }]
        },
        {
          stageId: 2,
          name: "Ongoing",
          tasks: [{            
            taskText: "Task 4"
          }]
        },
        {
          stageId: 3,
          name: "Done",
          tasks: []
        }
      ],      
    };  
    
    let selectedTasks = [];
    
  }

  addTask = (taskText, stageIdx) => {
    //using spread to create separate reference object, to not mutate original state
    const taskList = [...this.state.stages]; 

    const newTask = {      
      taskText: taskText
    }
    
    taskList[stageIdx].tasks.push(newTask);
    this.setState({stages: taskList});    
  }

  deleteTask = (taskId, stageId) => {    
    const taskList = [...this.state.stages];
    delete taskList[stageId].tasks[taskId];
    this.setState({stages: taskList});
  }

  moveSelectedTask = (tasks, stageId, direction) => {    
    const taskList = [...this.state.stages];
    
    for (let i = 0; i < tasks.length; i++) {
      let taskId = tasks[i].idx;
      const taskText = taskList[stageId].tasks[taskId].taskText;
      const newTask = {
         taskText,
      };
      delete taskList[stageId].tasks[taskId];
      if (direction === "left") {
         taskList[stageId - 1].tasks.push(newTask);
      } else {
         taskList[stageId + 1].tasks.push(newTask);
      }
    }
    this.setState({stages: taskList});
  }


  render() {
    console.log(this.state.selectedTasks);
    const stages = this.state.stages.map((stage, idx) => (
       <Card interactive={true} elevation='2'>
          <Stage
             {...stage}
             key={idx}
             stageId={stage.stageId}
             onMoveSelectedTask={(selectedTasks, selectedStageId, direction) => {
                this.moveSelectedTask(selectedTasks, selectedStageId, direction);
             }}
             onAddTask={(taskText, stageId) => {
                console.log(taskText);
                this.addTask(taskText, stageId);
             }}
             onDeleteTask={(taskId, stageId) => {
                this.deleteTask(taskId, stageId);
             }}
          />
       </Card>
    ));
    return (
       <div className='App'>
          <h1>Kanban board</h1>          
          <div className='stages-wrapper'>{stages}</div>          
       </div>
    );
  }
}

export default App;
