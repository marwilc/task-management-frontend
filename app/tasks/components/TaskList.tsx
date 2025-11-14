"use client";
import TaskItem from "./TaskItem";
import { useTasks } from "../hooks/useTasks";
import { Task } from "../types/task-type";

function parseDate(d?: string | null) {
  if (!d) return null;
  const ms = Date.parse(d); // YYYY-MM-DD -> UTC midnight
  return Number.isNaN(ms) ? null : new Date(ms);
}

function sortByDue(a: Task, b: Task) {
  const da = parseDate(a.date);
  const db = parseDate(b.date);
  if (da && db) return da.getTime() - db.getTime(); // más próxima primero
  if (da && !db) return -1; // con fecha antes que sin fecha
  if (!da && db) return 1;
  return 0;
}

export default function TaskList() {
  const { tasks: tasksData, cycleStatus, setDueDate, removeTask } = useTasks();
  const tasks = (tasksData as Task[]).slice().sort(sortByDue);
  return (
    <ul className="space-y-2">
      {tasks.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          onCycleStatus={cycleStatus}
          onSetDueDate={setDueDate}
          onRemoveTask={removeTask}
        />
      ))}
      {tasks.length === 0 && (
        <li className="text-sm opacity-70">
          No tasks yet. Create the first one above.
        </li>
      )}
    </ul>
  );
}
