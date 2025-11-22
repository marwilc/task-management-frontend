import { ChatCompletionMessageParam } from "openai/resources";
import { Task } from "../types/task-type";
import { ENV } from "@/env.local";
// features/tasks/api/task-api.ts
const BASE_URL = `${ENV.API_URL}/tasks`;

export async function getTasks() {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  return res.json();
}

export async function getTask(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });
  return res.json();
}

export async function createTask(task: Partial<Task>) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
}

export async function deleteTask(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

export async function updateTask(id: string, task: Partial<Task>) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
}

// delete: /tasks?status=DONE
export async function deleteTasks(status: "DONE" | "IN_PROGRESS" | "TODO") {
  const res = await fetch(`${BASE_URL}?status=${status}`, {
    method: "DELETE",
  });
  return res.json();
}

export async function cycleStatusApi(id: string) {
  const res = await fetch(`${BASE_URL}/${id}/cycle`, {
    method: "PUT",
  });
  return res.json();
}

export async function fetchSuggestion(messages: ChatCompletionMessageParam[]) {
  const res = await fetch(`${ENV.API_URL}/suggestions`, {
    method: "POST",
    body: JSON.stringify({ messages }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { suggestion } = await res.json();
  return suggestion;
};
