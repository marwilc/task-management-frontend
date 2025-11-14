"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createTask,
  cycleStatusApi,
  deleteTask,
  deleteTasks,
  getTasks,
  updateTask,
  fetchSuggestion as fetchSuggestionApi,
} from "../api/task-api";
import { Task } from "../types/task-type";
import { ChatCompletionMessageParam } from "openai/resources";

type TasksContextValue = {
  tasks: Task[];
  loading: boolean;
  reload: () => Promise<void>;
  addTask: (formData: FormData) => Promise<void>;
  editTask: (id: string, task: Partial<Task>) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
  clearDone: () => Promise<void>;
  cycleStatus: (id: string) => Promise<void>;
  setDueDate: (id: string, date: string) => Promise<void>;
  fetchSuggestion: (input: string) => Promise<string>;
  generateSummary: (tasks: Task[]) => Promise<string>;
};

const TasksContext = createContext<TasksContextValue | undefined>(undefined);

function useTasksProvider(): TasksContextValue {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const addTask = useCallback(async (formData: FormData) => {
    const title = String(formData.get("title") || "").trim();
    const date = String(formData.get("date") || "").trim(); // YYYY-MM-DD
    const notes = String(formData.get("notes") || "").trim();
    if (!title) return;

    const task: Partial<Task> = {
      title,
      date: date ? new Date(date).toISOString() : undefined,
      notes: notes || undefined,
    };
    const newTask = await createTask(task);
    setTasks((prev) => [...prev, newTask]);
  }, []);

  const editTask = useCallback(async (id: string, task: Partial<Task>) => {
    const updated = await updateTask(id, task);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }, []);

  const removeTask = useCallback(async (id: string) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearDone = useCallback(async () => {
    await deleteTasks("DONE");
    setTasks((prev) => prev.filter((t) => t.status !== "DONE"));
  }, []);

  const cycleStatus = useCallback(
    async (id: string) => {
      const updated = await cycleStatusApi(id);
      if (updated && updated.status) {
        setTasks((prev) =>
          prev.map((t) => (t.id === id ? { ...t, status: updated.status } : t))
        );
      } else {
        await loadTasks();
      }
    },
    [loadTasks]
  );

  const setDueDate = useCallback(
    async (id: string, date: string) => {
      const task = tasks.find((t) => t.id === id);
      const taskToUpdate: Partial<Task> = {
        title: task?.title,
        status: task?.status,
        notes: task?.notes,
        date: date ? new Date(date).toISOString() : null,
      };
      const updated = await updateTask(id, taskToUpdate);
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, date: updated.date } : t))
      );
    },
    [tasks]
  );

  const fetchSuggestion = useCallback(async (input: string) => {
    const prompt = input.trim();
    if (!prompt) return "";

    const messages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: "Eres un asistente que genera sugerencias para tareas.",
      },
      {
        role: "user",
        content: prompt,
      },
    ];

    try {
      const suggestion = await fetchSuggestionApi(messages);
      return typeof suggestion === "string" ? suggestion : "";
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Failed to fetch suggestion", error);
      }
      return "";
    }
  }, []);

  const generateSummary = useCallback(async (tasks: Task[]) => {
    const messages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content:
          "Eres un asistente que analiza tareas de un usuario y genera un resumen del día: prioridades, cosas vencidas y próximos pasos.",
      },
      {
        role: "user",
        content: `Estas son las tareas:
  
  ${tasks
    .map(
      (t, i) =>
        `Tarea ${i + 1}:
    Título: ${t.title}
    Estado: ${t.status}
    Fecha límite: ${t.date ?? "Sin fecha"}
    Notas: ${t.notes ?? "Sin notas"}`
    )
    .join("\n\n")}
  
  Devuélveme:
  
  1. Resumen ejecutivo (máximo 3 líneas)
  2. Lista de prioridades inmediatas
  3. Observaciones útiles
  4. Lista de tareas completadas
  `,
      },
    ];

    try {
      const summary = await fetchSuggestionApi(messages);
      return typeof summary === "string" ? summary : "";
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Failed to generate summary", error);
      }
      return "";
    }
  }, []);

  return useMemo(
    () => ({
      tasks,
      loading,
      reload: loadTasks,
      addTask,
      editTask,
      removeTask,
      clearDone,
      cycleStatus,
      setDueDate,
      fetchSuggestion,
      generateSummary,
    }),
    [
      tasks,
      loading,
      loadTasks,
      addTask,
      editTask,
      removeTask,
      clearDone,
      cycleStatus,
      setDueDate,
      fetchSuggestion,
      generateSummary,
    ]
  );
}

export function TasksProvider({ children }: { children: ReactNode }) {
  const value = useTasksProvider();
  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}

export function useTasks(): TasksContextValue {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
}
