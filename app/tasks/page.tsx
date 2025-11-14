import TasksContent from "./components/TasksContent";

export const metadata = { title: "Tasks" };

export default function TasksPage() {
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-4">
      <TasksContent />
    </main>
  );
}
