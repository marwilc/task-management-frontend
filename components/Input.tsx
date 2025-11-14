"use client";
import { Input as HeroInput } from "@heroui/input";
import type { ComponentProps } from "react";

type HeroInputProps = ComponentProps<typeof HeroInput>;

type InputProps = HeroInputProps & {
  className?: string;
};

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
  ...rest
}: InputProps) {
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
      {...rest}
    />
  );
}
