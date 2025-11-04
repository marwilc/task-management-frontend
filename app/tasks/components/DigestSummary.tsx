"use client";
import { useState } from "react";
import { Card, CardBody } from "@heroui/card";
import Button from "@/components/Button";

type Task = {
  id: string;
  title: string;
  status: string;
  due?: string | null;
};

export default function DigestSummary({ tasks }: { tasks: Task[] }) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const relevantTasks = tasks.filter((t) => {
    if (!t.due) return false;
    const date = new Date(t.due);
    const now = new Date();
    const diff = Math.floor(
      (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diff <= 1 || diff < 0; // vencidas, hoy o mañana
  });

  const handleDigest = async () => {
    setLoading(true);
    setSummary(null);
    const res = await fetch("/api/ai/digest", {
      method: "POST",
      body: JSON.stringify({ tasks: relevantTasks }),
    });
    const data = await res.json();
    setSummary(data.summary || "Sin resumen.");
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
