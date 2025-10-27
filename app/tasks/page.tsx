import {
  getTasks,
  createTask,
  cycleStatus,
  deleteTask,
  clearDone,
  setDueDate,
  type Task,
} from "./actions";
import SubmitButton from "@/components/SubmitButton";
import Link from "next/link";

export const metadata = { title: "Tasks" };

function statusClass(s: Task["status"]) {
  const base = "text-xs rounded-full px-2 py-1 border";
  if (s === "TODO") return `${base} border-gray-300`;
  if (s === "IN_PROGRESS") return `${base} border-amber-400`;
  return `${base} border-emerald-400`;
}

function parseDate(d?: string | null) {
  if (!d) return null;
  const ms = Date.parse(d); // YYYY-MM-DD -> UTC midnight
  return Number.isNaN(ms) ? null : new Date(ms);
}

function daysUntil(d?: string | null) {
  const date = parseDate(d);
  if (!date) return null;
  const now = new Date();
  // normalizamos a día (sin horas) en UTC para simplicidad
  const start = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  );
  const due = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  );
  return Math.round((due - start) / (1000 * 60 * 60 * 24));
}

function dueLabel(d?: string | null) {
  const du = daysUntil(d);
  if (du === null) return "Sin fecha";
  if (du < 0) return "Vencida";
  if (du === 0) return "Hoy";
  if (du === 1) return "Mañana";
  return `En ${du} días`;
}

function dueBadgeClass(d?: string | null) {
  const du = daysUntil(d);
  const base = "text-xs rounded-full px-2 py-1 border";
  if (du === null) return `${base} border-gray-300`;
  if (du < 0) return `${base} border-red-500`;
  if (du <= 1) return `${base} border-amber-500`;
  return `${base} border-sky-400`;
}

function sortByDue(a: Task, b: Task) {
  const da = parseDate(a.due);
  const db = parseDate(b.due);
  if (da && db) return da.getTime() - db.getTime(); // más próxima primero
  if (da && !db) return -1; // con fecha antes que sin fecha
  if (!da && db) return 1;
  return 0;
}

export default async function TasksPage() {
  const tasks: Task[] = (await getTasks()).slice().sort(sortByDue);

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Tasks</h1>
        <form action={clearDone}>
          <SubmitButton
            className="border px-3 py-2 text-sm rounded hover:bg-neutral-50"
            pendingLabel="Eliminando…"
          >
            Eliminar completadas
          </SubmitButton>
        </form>
      </header>

      {/* Crear */}
      <form action={createTask} className="grid gap-2 border p-4 rounded-xl">
        <label htmlFor="title" className="text-sm font-medium">
          Nueva tarea
        </label>
        <input
          id="title"
          name="title"
          placeholder="Ej. Integrar resumen con IA"
          className="border rounded px-3 py-2"
          required
        />

        <div className="grid sm:grid-cols-2 gap-2">
          <div className="grid gap-1">
            <label htmlFor="due" className="text-sm">
              Due date (opcional)
            </label>
            <input
              id="due"
              name="due"
              type="date"
              className="border rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <SubmitButton
            className="bg-black text-white"
            pendingLabel="Guardando…"
          >
            + Nueva
          </SubmitButton>
          <Link href="/" className="text-sm underline px-2 py-2">
            Ir a Home
          </Link>
        </div>
        <p className="text-xs text-muted-foreground">
          * Persistencia local con cookies (dev).
        </p>
      </form>

      {/* Lista */}
      <ul className="space-y-2">
        {tasks.map((t) => (
          <li
            key={t.id}
            className="border rounded-xl p-4 flex items-center justify-between gap-3"
          >
            <div className="min-w-0">
              <h3 className="font-medium truncate">{t.title}</h3>
              <div className="flex gap-2 mt-1 items-center">
                <span className={statusClass(t.status)}>
                  {t.status.replace("_", " ")}
                </span>
                <span className={dueBadgeClass(t.due)} title={t.due ?? "—"}>
                  {dueLabel(t.due)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Cambiar fecha */}
              <form action={setDueDate} className="flex items-center gap-2">
                <input type="hidden" name="id" value={t.id} />
                <input
                  name="due"
                  type="date"
                  defaultValue={t.due ?? ""}
                  className="border rounded px-2 py-1 text-sm"
                />
                <SubmitButton
                  className="border px-3 py-2 rounded text-sm"
                  pendingLabel="Actualizando…"
                >
                  Guardar fecha
                </SubmitButton>
              </form>

              {/* Avanzar estado */}
              <form action={cycleStatus}>
                <input type="hidden" name="id" value={t.id} />
                <SubmitButton
                  className="border px-3 py-2 rounded text-sm"
                  pendingLabel="Actualizando…"
                >
                  Avanzar
                </SubmitButton>
              </form>

              {/* Eliminar */}
              <form action={deleteTask}>
                <input type="hidden" name="id" value={t.id} />
                <SubmitButton
                  className="border px-3 py-2 rounded text-sm text-red-600"
                  pendingLabel="Eliminando…"
                >
                  Eliminar
                </SubmitButton>
              </form>
            </div>
          </li>
        ))}
        {tasks.length === 0 && (
          <li className="text-sm opacity-70">
            Sin tareas aún. Crea la primera arriba.
          </li>
        )}
      </ul>
    </main>
  );
}
