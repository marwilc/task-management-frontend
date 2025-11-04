import { NextRequest } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

export const runtime = "edge"; // rápido para IA

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function parseTasks(
  body: unknown
): { title: string; status: string; due?: string | null }[] {
  if (!Array.isArray(body)) return [];
  return body
    .filter((t) => typeof t?.title === "string")
    .map((t) => ({ title: t.title, status: t.status, due: t.due ?? null }));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const tasks = parseTasks(body.tasks);

  if (!tasks.length) return new Response("No tasks", { status: 400 });

  const prompt = [
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
  Fecha límite: ${t.due ?? "Sin fecha"}`
  )
  .join("\n\n")}

Devuélveme:

1. Resumen ejecutivo (máximo 3 líneas)
2. Lista de prioridades inmediatas
3. Observaciones útiles
`,
    },
  ];

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.3,
    messages: prompt as ChatCompletionMessageParam[],
  });

  const text = completion.choices?.[0]?.message?.content ?? "Sin respuesta.";
  return new Response(JSON.stringify({ summary: text }), {
    headers: { "Content-Type": "application/json" },
  });
}
