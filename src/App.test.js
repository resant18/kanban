import React from "react";
import App, { STAGE_NAMES, NUM_STAGES } from "./App";
import {
  render,
  fireEvent,
  cleanup,
  waitForDomChange,
  getByText,
  getByTestId
} from "@testing-library/react";

import "jest-dom/extend-expect";

let renderAppAndAddTasks;

beforeEach(() => {
  renderAppAndAddTasks = () => {
    const testOps = render(<App />);
    const { getByTestId } = testOps;
    
    // show the add input
    const addButton = getByTestId(addButtonTestId(0));
    fireEvent.click(addButton);
    const addInput = getByTestId(newTaskInputTestId(0));
    expect(addInput).toBeVisible();
    
    // add a new task
    fireEvent.change(addInput, { target: { value: "test task 1" } });
    const addInputConfirm = getByTestId(newTaskInputConfirmTestId(0));
    expect(addInputConfirm).toBeVisible();
    fireEvent.click(addInputConfirm);

    // add a second task
    fireEvent.click(getByTestId(addButtonTestId(0)));
    fireEvent.change(getByTestId(newTaskInputTestId(0)), {
      target: { value: "test task 2" }
    });
    fireEvent.click(getByTestId(newTaskInputConfirmTestId(0)));

    return testOps;
  };
});

afterEach(() => cleanup());

// test ID helpers 
const stageTestId = stageId => `stage-${stageId}`;
const addButtonTestId = stageId => `${stageTestId(stageId)}-add-button`;
const newTaskInputTestId = stageId => `${stageTestId(stageId)}-new-task-input`;
const newTaskInputConfirmTestId = stageId =>
  `${stageTestId(stageId)}-new-task-input-confirm`;
const moveLeftButtonTestId = stageId => `${stageTestId(stageId)}-move-left`;
const moveRightButtonTestId = stageId => `${stageTestId(stageId)}-move-right`;
const deleteButtonTestId = stageId => `${stageTestId(stageId)}-delete`;
const taskNameToId = name => `task-${name.toLowerCase().split(" ").join("-")}`;

test("Renders all columns with heading", () => {
  const { getByTestId } = render(<App />);
  for (let i = 0; i < NUM_STAGES; i++) {
    const col = getByTestId(stageTestId(i));
    expect(col).toBeTruthy();
    const heading = getByText(col, STAGE_NAMES[i]);
    expect(heading).toBeTruthy();
  }
});

test("Renders a given set of tasks", () => {
  const { container } = render(<App />);
  const col1 = getByTestId(container, stageTestId(0));
  const col2 = getByTestId(container, stageTestId(1));
  const col3 = getByTestId(container, stageTestId(2));

  const task1 = getByTestId(col1, taskNameToId("Task 1"));
  expect(task1).toBeTruthy();

  const task2 = getByTestId(col1, taskNameToId("Task 2"));
  expect(task2).toBeTruthy();

  const task3 = getByTestId(col2, taskNameToId("Task 3"));
  expect(task3).toBeTruthy();

  const task4 = getByTestId(col3, taskNameToId("Task 4"));
  expect(task4).toBeTruthy();
});

test("Adding Tasks", () => {
  const { getByTestId } = renderAppAndAddTasks();

  const task1 = getByTestId(taskNameToId("test task 1"));
  const task2 = getByTestId(taskNameToId("test task 2"));
  const firstStage = getByTestId(stageTestId(0));
  expect(firstStage).toContainElement(task1);
  expect(firstStage).toContainElement(task2);
});

test("Selecting and Deselecting Tasks", () => {
  const { getByTestId, queryByTestId } = renderAppAndAddTasks();
  const firstStage = getByTestId(stageTestId(0));
  let task1 = getByTestId(taskNameToId("test task 1"));
  fireEvent.click(task1);

  let deleteButton = getByTestId(deleteButtonTestId(0));
  expect(deleteButton).toBeVisible();
  task1 = getByTestId(taskNameToId("test task 1"));
  fireEvent.click(task1);
  deleteButton = queryByTestId(deleteButtonTestId(0));
  expect(deleteButton).toBeNull();
});

test("Deleting Tasks", () => {
  const { getByTestId, queryByTestId } = renderAppAndAddTasks();
  const firstStage = getByTestId(stageTestId(0));
  const task1 = getByTestId(taskNameToId("test task 1"));
  const task2 = getByTestId(taskNameToId("test task 2"));
  fireEvent.click(task1);
  let deleteButton = getByTestId(deleteButtonTestId(0));
  fireEvent.click(deleteButton);
  expect(firstStage).not.toContainElement(task1);

  fireEvent.click(task2);
  deleteButton = getByTestId(deleteButtonTestId(0));
  fireEvent.click(deleteButton);
  expect(firstStage).not.toContainElement(task2);
});

test("Moving Tasks", () => {
  const { getByTestId, queryByTestId, container } = renderAppAndAddTasks();
  const firstStage = getByTestId(stageTestId(0));
  const secondStage = getByTestId(stageTestId(1));
  const thirdStage = getByTestId(stageTestId(2));
  let task1 = getByTestId(taskNameToId("test task 1"));
  fireEvent.click(task1);
  let moveLeftButton = queryByTestId(moveLeftButtonTestId(0));
  expect(moveLeftButton).toBeNull();
  let moveRightButton = getByTestId(moveRightButtonTestId(0));
  fireEvent.click(moveRightButton);
  task1 = getByTestId(taskNameToId("test task 1"));

  expect(firstStage).not.toContainElement(task1);
  expect(secondStage).toContainElement(task1);

  fireEvent.click(task1);
  moveRightButton = getByTestId(moveRightButtonTestId(1));
  fireEvent.click(moveRightButton);
  task1 = getByTestId(taskNameToId("test task 1"));
  expect(secondStage).not.toContainElement(task1);
  expect(thirdStage).toContainElement(task1);

  fireEvent.click(task1);
  moveLeftButton = getByTestId(moveLeftButtonTestId(2));
  fireEvent.click(moveLeftButton);
  task1 = getByTestId(taskNameToId("test task 1"));
  expect(secondStage).toContainElement(task1);
  expect(thirdStage).not.toContainElement(task1);
});
