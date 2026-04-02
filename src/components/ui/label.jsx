import { cn } from "../../lib/utils";

export function Label({ className, ...props }) {
  return (
    <label
      className={cn(
        "text-sm font-medium text-zinc-300 leading-none",
        className
      )}
      {...props}
    />
  );
}