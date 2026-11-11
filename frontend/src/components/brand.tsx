import { Link } from "react-router";
import { cn } from "@/lib/utils";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      to="/"
      className={cn("brand", light && "brand-light")}
      aria-label="Weddingly home"
    >
      <svg viewBox="0 0 40 44" fill="none" aria-hidden="true">
        <ellipse cx="15" cy="25" rx="8" ry="11" transform="rotate(-28 15 25)" />
        <ellipse cx="25" cy="25" rx="8" ry="11" transform="rotate(28 25 25)" />
        <path d="m20 3 1.5 4.5L26 9l-4.5 1.5L20 15l-1.5-4.5L14 9l4.5-1.5z" />
      </svg>
      <span>
        Weddingly<span className="brand-dot">.</span>
      </span>
    </Link>
  );
}
