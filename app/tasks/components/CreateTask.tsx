// app/tasks/components/CreateTask.tsx
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTasks } from "../hooks/useTasks";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link";
import { Card, CardBody } from "@heroui/card";
import { Form } from "@heroui/form";
import { DatePicker, Textarea } from "@heroui/react";

const DEBOUNCE_MS = 400;

export default function CreateTask() {
  const { addTask, fetchSuggestion } = useTasks();
  const [titleDraft, setTitleDraft] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);
  const [notes, setNotes] = useState("");
  const [notesDirty, setNotesDirty] = useState(false);

  useEffect(() => {
    if (!titleDraft.trim()) {
      setSuggestion("");
      if (!notesDirty) {
        setNotes("");
      }
      setNotesDirty(false);
      setLoadingSuggestion(false);
      return;
    }

    let ignore = false;
    const handle = window.setTimeout(async () => {
      try {
        setLoadingSuggestion(true);
        const result = await fetchSuggestion(titleDraft);
        if (!ignore) {
          const nextSuggestion = result ?? "";
          setSuggestion(nextSuggestion);
          if (!notesDirty) {
            setNotes(nextSuggestion);
          }
        }
      } catch (error) {
        if (!ignore && process.env.NODE_ENV !== "production") {
          console.error("Failed to fetch suggestion", error);
        }
        if (!ignore) {
          setSuggestion("");
        }
      } finally {
        if (!ignore) {
          setLoadingSuggestion(false);
        }
      }
    }, DEBOUNCE_MS);

    return () => {
      ignore = true;
      window.clearTimeout(handle);
    };
  }, [titleDraft, fetchSuggestion, notesDirty]);

  const placeholder = useMemo(() => {
    if (loadingSuggestion && !suggestion) {
      return "Thinking of a suggestion…";
    }
    return suggestion || "What do you need to accomplish?";
  }, [loadingSuggestion, suggestion]);

  const handleNotesChange = useCallback((value: string) => {
    setNotes(value);
    setNotesDirty(true);
  }, []);

  return (
    <Card>
      <CardBody>
        <Form action={addTask} className="grid gap-2 p-4 rounded-xl">
          <Input
            id="title"
            name="title"
            label="New task"
            className="py-2"
            placeholder={placeholder}
            onValueChange={setTitleDraft}
            isRequired
          />
          <Textarea
            id="notes"
            name="notes"
            variant="bordered"
            labelPlacement="outside"
            label="Description by AI (optional)"
            className="py-2"
            minRows={3}
            maxLength={1000}
            errorMessage={notes.length > 1000 ? "Maximum length is 1000 characters" : ""}
            isInvalid={notes.length > 1000}
            value={notes}
            onValueChange={handleNotesChange}
          />

          <div className="grid sm:grid-cols-2 gap-2">
            <div className="grid gap-1">
              <DatePicker
                radius="sm"
                variant="bordered"
                labelPlacement="outside"
                className="max-w-[284px] py-2"
                label="Due date (optional)"
                id="date"
                name="date"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button>+ New</Button>

            <Link href="/" className="text-sm underline px-2 py-2">
              Go to Home
            </Link>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
}
