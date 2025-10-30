"use client";
import { Input as HeroInput } from "@heroui/input";

export default function Input({
  id = "",
  name = "",
  className = "",
  label = "",
  placeholder = "",
  labelPlacement = "outside",
  variant = "bordered",
  radius = "sm",
  type = "text",
  isRequired = false,
  defaultValue = "",
}: {
  id?: string;
  name?: string;
  className?: string;
  label?: string;
  placeholder?: string;
  labelPlacement?: "outside" | "inside" | undefined;
  variant?: "flat" | "bordered" | "faded" | "underlined" | undefined;
  radius?: "none" | "sm" | "md" | "lg" | "full" | undefined;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "date"
    | "time"
    | "datetime-local"
    | "search"
    | "tel"
    | "url"
    | "textarea"
    | undefined;
  isRequired?: boolean;
  defaultValue?: string;
}) {
  return (
    <HeroInput
      id={id}
      name={name}
      label={label}
      placeholder={placeholder}
      labelPlacement={labelPlacement}
      variant={variant}
      className={className}
      radius={radius}
      type={type}
      isRequired={isRequired}
      defaultValue={defaultValue}
    />
  );
}
