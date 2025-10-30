// app/tasks/components/CreateTask.tsx
"use client";
import { createTask } from "../actions";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link";
import { Card, CardBody } from "@heroui/card";
import { Form } from "@heroui/form";
import { DatePicker } from "@heroui/react";

export default function CreateTask() {
  return (
    <Card>
      <CardBody>
        <Form action={createTask} className="grid gap-2 p-4 rounded-xl">
          <Input
            id="title"
            name="title"
            label="New task"
            className="py-2"
            isRequired
          />

          <div className="grid sm:grid-cols-2 gap-2">
            <div className="grid gap-1">
              <DatePicker
                radius="sm"
                variant="bordered"
                labelPlacement="outside"
                className="max-w-[284px] py-2"
                label="Due date (optional)"
                id="due"
                name="due"
              />
          
            </div>
          </div>

          <div className="flex gap-2">
            <Button>+ New</Button>

            <Link href="/" className="text-sm underline px-2 py-2">
              Go to Home
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            * Local persistence with cookies (dev).
          </p>
        </Form>
      </CardBody>
    </Card>
  );
}
