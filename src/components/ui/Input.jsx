import { cn } from "../../lib/utils";

export function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      className={cn(
        `flex h-10 w-full rounded-md border-none bg-zinc-800 px-3 py-2 text-sm
         text-white placeholder:text-neutral-400 shadow-[0px_0px_1px_1px_#404040]
         focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400
         transition duration-400`,
        className 
      )}
      {...props}
    />
  );
}