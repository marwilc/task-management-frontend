"use server";

import { cookies } from "next/headers";
import { Task } from "./types/task-type";

const COOKIE = "tm_tasks_v1";



async function readTasks(): Promise<Task[]> {
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!raw)
    return [
      { id: "t1", title: "Diseñar layout base", status: "DONE" },
      { id: "t2", title: "Crear página /tasks", status: "IN_PROGRESS" },
      { id: "t3", title: "Botón para añadir tarea", status: "TODO" },
    ];
  try {
    const parsed = JSON.parse(raw) as Task[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeTasks(tasks: Task[]): Promise<void> {
  (await cookies()).set({
    name: COOKIE,
    value: JSON.stringify(tasks),
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 días
  });
}

export async function getTasks(): Promise<Task[]> {
  return readTasks();
}

export async function createTask(formData: FormData){
  const title = String(formData.get("title") || "").trim();
  const date = String(formData.get("date") || "").trim(); // YYYY-MM-DD
  if (!title) return;

  const tasks = await readTasks();
  const newTask: Task = {
    id: crypto.randomUUID(),
    title,
    status: "TODO",
    date: date || null,
  };
  await writeTasks([newTask, ...tasks]);
}

export async function cycleStatus(id: string) {
  const tasks = await readTasks();
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return;

  const order: Task["status"][] = ["TODO", "IN_PROGRESS", "DONE"];
  const current = tasks[idx].status;
  const next = order[(order.indexOf(current) + 1) % order.length];
  tasks[idx] = { ...tasks[idx], status: next };

  writeTasks(tasks);
}


export async function deleteTask(id: string) {
  const tasks = await readTasks();
  const next = tasks.filter((t) => t.id !== id);
  await writeTasks(next);
}

// (Opcional) borrar todas las completadas
export async function clearDone() {
  const tasks = await readTasks();
  writeTasks(tasks.filter((t) => t.status !== "DONE"));
}

export async function setDueDate(id: string, date: string ) {
  const tasks = await readTasks();
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return;  
  tasks[idx] = { ...tasks[idx], date: date || null };
  await writeTasks(tasks);
}
