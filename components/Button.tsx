"use client";
import { Button as HeroButton } from "@heroui/button";
import { useFormStatus } from "react-dom";

export default function Button({
  children,
  className = "",
  pendingLabel = "Saving…",
  color = "primary",
  variant = "solid",
  size = "md",
  type = "submit",
  radius = "md",
  isLoading = false,
  onPress,
  isDisabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  pendingLabel?: string;
  color?: "primary" | "default" | "secondary" | "success" | "warning" | "danger" | undefined;
  variant?: "solid" | "flat" | "bordered" | "light" | "faded" | "shadow" | "ghost" | undefined;
  size?: "md" | "sm" | "lg" | undefined;
  type?: "button" | "submit" | "reset" | undefined;
  radius?: "none" | "sm" | "md" | "lg" | "full" | undefined;
  isLoading?: boolean;
  onPress?: () => void;
  isDisabled?: boolean;
}) {
  const { pending} = useFormStatus();
  return (  
    <HeroButton
      color={color}
      variant={variant}
      size={size}
      type={type}
      disabled={pending}
      aria-busy={pending}
      className={className}
      radius={radius}
      isLoading={isLoading}
      onPress={onPress}
      isDisabled={isDisabled}
    >
      {pending ? pendingLabel : children}
    </HeroButton>
  );
}
