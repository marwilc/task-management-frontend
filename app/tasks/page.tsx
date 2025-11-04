import Button from "@/components/Button";
import { clearDone, getTasks, type Task } from "./actions";
import CreateTask from "./components/CreateTask";
import TaskItem from "./components/TaskItem";
import DigestSummary from "./components/DigestSummary";

export const metadata = { title: "Tasks" };

function parseDate(d?: string | null) {
  if (!d) return null;
  const ms = Date.parse(d); // YYYY-MM-DD -> UTC midnight
  return Number.isNaN(ms) ? null : new Date(ms);
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
      <DigestSummary tasks={tasks} />

      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Tasks</h1>
        <form action={clearDone}>
          <Button color="danger" variant="ghost">
            Delete completed
          </Button>
        </form>
      </header>

      {/* Crear */}
      <CreateTask />

      {/* Lista */}
      <ul className="space-y-2">
        {tasks.map((t) => (
          <TaskItem key={t.id} task={t} />
        ))}
        {tasks.length === 0 && (
          <li className="text-sm opacity-70">
            No tasks yet. Create the first one above.
          </li>
        )}
      </ul>
    </main>
  );
}
