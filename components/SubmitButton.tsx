"use client";
import { useFormStatus } from "react-dom";

export default function SubmitButton({
  children,
  className = "",
  pendingLabel = "Guardando…",
}: {
  children: React.ReactNode;
  className?: string;
  pendingLabel?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`rounded px-3 py-2 text-sm disabled:opacity-60 ${className}`}
      aria-busy={pending}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
