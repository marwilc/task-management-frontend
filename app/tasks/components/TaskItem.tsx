// app/tasks/components/TaskItem.tsx
"use client";
import Button from "@/components/Button";
import { Card, CardBody, Chip, DatePicker } from "@heroui/react";
import { cycleStatus, deleteTask, setDueDate, Task } from "../actions";

import { CalendarDate } from "@internationalized/date";

function statusClass(s: Task["status"]) {
  //   const base = "text-xs rounded-full px-2 py-1 border";
  if (s === "TODO") return `default`;
  if (s === "IN_PROGRESS") return `warning`;
  return `success`;
}

function getDateValue(d?: string | null) {
  const date = new CalendarDate(
    Number(d?.split("-")[0]),
    Number(d?.split("-")[1]),
    Number(d?.split("-")[2])
  );
  return date;
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
  if (du === null) return "No date";
  if (du < 0) return "Expired";
  if (du === 0) return "Today";
  if (du === 1) return "Tomorrow";
  return `In ${du} days`;
}

function dueBadgeClass(d?: string | null) {
  const du = daysUntil(d);
  if (du === null) return `default`;
  if (du < 0) return `danger`;
  if (du <= 1) return `warning`;
  return `primary`;
}

export default function TaskItem({ task }: { task: Task }) {
  return (
    <li
      key={task.id}
      //   className="border rounded-xl p-4 flex items-center justify-between gap-3"
    >
      <Card className="w-full">
        <CardBody className="p-4 w-full flex flex-row items-center justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-medium truncate">{task.title}</h3>
            <div className="flex gap-2 mt-1 items-center">
              <Chip color={statusClass(task.status)} variant="flat">
                {task.status.replace("_", " ")}
              </Chip>
              <Chip color={dueBadgeClass(task.due)} variant="flat">
                {dueLabel(task.due)}
              </Chip>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Cambiar fecha */}
            <form action={setDueDate} className="flex items-center gap-2">
              <input type="hidden" name="id" value={task.id} />

              <DatePicker
                variant="bordered"
                labelPlacement="outside"
                radius="sm"
                className="max-w-[284px] py-2"
                value={task.due ? getDateValue(task.due) : null}
                id="due"
                name="due"
              />
              <Button variant="ghost">Save date</Button>
            </form>

            {/* Avanzar estado */}
            <form action={cycleStatus}>
              <input type="hidden" name="id" value={task.id} />
              <Button color="success" variant="ghost">
                Next
              </Button>
            </form>

            {/* Eliminar */}
            <form action={deleteTask}>
              <input type="hidden" name="id" value={task.id} />
              <Button color="danger" variant="ghost">
                Delete
              </Button>
            </form>
          </div>
        </CardBody>
      </Card>
    </li>
  );
}
