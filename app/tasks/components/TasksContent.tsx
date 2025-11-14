"use client";

import DigestSummary from "./DigestSummary";
import HeaderTask from "./HeaderTask";
import TaskList from "./TaskList";
import CreateTask from "./CreateTask";
import { TasksProvider } from "../hooks/useTasks";

export default function TasksContent() {
  return (
    <TasksProvider>
      <DigestSummary />
      <HeaderTask />
      <CreateTask />
      <TaskList />
    </TasksProvider>
  );
}

