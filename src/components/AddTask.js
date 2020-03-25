//This file is not a part of initial code
import React from "react";
import { Button, Collapse } from "@blueprintjs/core";

class AddTask extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         isEditable: false
      };      
      this.taskInput = React.createRef();

      this.handleSubmit = this.handleSubmit.bind(this);
   }

   setEditable = (editable) => {
      return () => {
         this.setState({
            isEditable: editable
         })
      }
   }

   handleSubmit = (e) => {
      e.preventDefault();

      const taskText = this.taskInput.current.value.trim();      
      const stageId = this.props.stageId;

      if (taskText && (stageId !== null)) {
         this.props.onAddTask(taskText, stageId);
      }

      this.taskInput.current.value = "";
   }

   render() {
      if (!this.state.isEditable) {
         return (
            <Button text="Add a Task" onClick={this.setEditable(true)} />
         )
      }
      else {
         return (
            <form onSubmit={this.handleSubmit}>
               <input type='text' aria-label='Add a Task' text='' ref={this.taskInput} />
               <br />
               <Button type='Submit' text='Add Task' />
               <Button text='Cancel' onClick={this.setEditable(false)} />
            </form>
         );
      }
   }
}

export default AddTask;