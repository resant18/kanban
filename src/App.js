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
            taskId: 1,
            taskText: "Task 1"
          }, {
            taskId: 2,
            taskText: "Task 2"
          }]
        },
        {
          stageId: 1,
          name: "To Do",
          tasks: [{
            taskId: 3,
            taskText: "Task 3"
          }]
        },
        {
          stageId: 2,
          name: "Ongoing",
          tasks: [{
            taskId: 4,
            taskText: "Task 4"
          }]
        },
        {
          stageId: 3,
          name: "Done",
          tasks: []
        }]
    };
    
  }

  addTask = (taskText, stageIdx) => {
    const taskList = [...this.state.stages]; // don't mutate 

    const newTask = {
      taskId: stageIdx,
      taskText: taskText
    }

    console.log(taskText);
    taskList[stageIdx].tasks.push(newTask);
    this.setState({stages: taskList});
  }

  render() {
    const stages = this.state.stages.map((stage, idx) => (
      //  <Card className=''>
          <Stage {...stage} key={idx} stageStageId={idx} 
            onAddTask={(taskText, stageId) => { 
              console.log(taskText); 
              this.addTask(taskText, stageId) }
            }/>
      //  </Card>
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
