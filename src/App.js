import React, { Component } from "react";
import { Card, Button, InputGroup } from "@blueprintjs/core";

import "./App.css";
import Stage from "./components/Stage";

export const NUM_STAGES = 4;
export const STAGE_NAMES = ["Backlog", "To Do", "Ongoing", "Done"];
export const TASKS = {
          0: [{ name: "Task1" }, { name: "Task2" }],
          1: [{ name: "Task2" }],
          2: [{ name: "Task3" }]
       };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
       <div className='App'>
          <h1>Kanban board</h1>
          <div className='board-wrapper'>
             {STAGE_NAMES.map((stage, idx) => (                
                <Stage name={stage} stageId={idx} stageTestId={idx} key={idx} />                
             ))}
          </div>
       </div>
    );
  }
}

export default App;
