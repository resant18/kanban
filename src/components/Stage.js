import React, { useState } from "react";

import Task from "./Task";
import { Card, Button, InputGroup, Collapse } from "@blueprintjs/core";

const Stage = ({ name, stageId }) => {
  const stageTestId = `stage-${stageId}`;
  const addButtonTestId = `${stageTestId}-add-button`;
  const newTaskInputTestId = `${stageTestId}-new-task-input`;
  const newTaskInputConfirmTestId = `${stageTestId}-new-task-input-confirm`;
  const moveLeftButtonTestId = `${stageTestId}-move-left`;
  const moveRightButtonTestId = `${stageTestId}-move-right`;
  const deleteButtonTestId = `${stageTestId}-delete`;

  return <div data-testid={stageTestId}>Stage</div>;
};

export default Stage;
