"use client";
import { useState } from "react";
import { Card, CardBody } from "@heroui/card";
import Button from "@/components/Button";
import { useTasks } from "../hooks/useTasks";
import { Task } from "../types/task-type";

export default function DigestSummary() {
  const { tasks, generateSummary } = useTasks();
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const relevantTasks = tasks.filter((t: Task) => {
    if (!t.date) return false;
    const date = new Date(t.date);
    const now = new Date();
    const diff = Math.floor(
      (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diff <= 1 || diff < 0; // vencidas, hoy o mañana
  });

  const handleDigest = async () => {
    setLoading(true);
    setSummary(null);
    const summary = await generateSummary(relevantTasks);
    setSummary(summary || "Sin resumen.");
    setLoading(false);
  };

  return (
    <Card>
      <CardBody className="p-4 space-y-3">
        <Button
          className="w-50"
          onPress={handleDigest}
          isDisabled={loading}
          type="button"
        >
          {loading ? "Resumiendo…" : "Resumen IA del día"}
        </Button>

        {summary && (
          <div className="text-sm whitespace-pre-wrap border-t pt-3 text-muted-foreground">
            {summary}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
