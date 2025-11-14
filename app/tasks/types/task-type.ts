export type Task = {
  id: string;
  title: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  date?: string | null;
  notes?: string | null;
};
