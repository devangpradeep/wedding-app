import { cn } from "@/lib/utils";

export function Botanical({ className }: { className?: string }) {
  return (
    <svg
      className={cn("botanical", className)}
      viewBox="0 0 140 180"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M21 174C68 121 102 74 104 10M56 129C37 125 20 108 19 91c23 2 38 15 37 38Zm15-23C88 109 113 96 122 79c-26-4-45 7-51 27Zm15-32C65 71 56 54 57 39c20 4 30 17 29 35Zm11-31c20-1 32-13 33-28-22 1-33 12-33 28ZM35 154c-17 1-30-7-33-19 17-3 29 4 33 19Zm9-5c14 8 32 4 43-8-16-10-32-7-43 8Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
