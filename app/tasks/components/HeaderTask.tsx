"use client";
import Button from "@/components/Button";
import { useTasks } from "../hooks/useTasks";

export default function HeaderTask() {
  const { clearDone } = useTasks();
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold">Tasks</h1>
      <form action={clearDone}>
        <Button color="danger" variant="ghost">
          Delete completed
        </Button>
      </form>
    </header>
  );
}
