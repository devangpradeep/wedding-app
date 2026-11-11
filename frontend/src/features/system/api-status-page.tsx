import { useEffect, useState } from "react";
import {
  CircleCheck,
  CircleDashed,
  CircleAlert,
  RefreshCw,
} from "lucide-react";
import { apiGet } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ConnectionStatus = "loading" | "connected" | "disconnected";

function isHealthy(value: unknown): value is { status: "UP" } {
  return (
    typeof value === "object" &&
    value !== null &&
    "status" in value &&
    value.status === "UP"
  );
}

export function ApiStatusPage() {
  const [status, setStatus] = useState<ConnectionStatus>("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function checkHealth() {
      try {
        const response = await apiGet("/api/health", controller.signal);
        if (active)
          setStatus(isHealthy(response) ? "connected" : "disconnected");
      } catch {
        if (active) setStatus("disconnected");
      }
    }

    void checkHealth();
    return () => {
      active = false;
      controller.abort();
    };
  }, [attempt]);

  function retry() {
    setStatus("loading");
    setAttempt((current) => current + 1);
  }

  const Icon =
    status === "connected"
      ? CircleCheck
      : status === "disconnected"
        ? CircleAlert
        : CircleDashed;
  const text =
    status === "connected"
      ? "API connected"
      : status === "disconnected"
        ? "API disconnected"
        : "Connecting to API";

  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-dvh w-full max-w-lg flex-col justify-center gap-6 px-6 py-12"
    >
      <div>
        <p className="eyebrow">Development diagnostics</p>
        <h1 className="mt-2 text-4xl">API status</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Checks whether this frontend can reach the backend health endpoint.
        </p>
      </div>
      <Card>
        <CardContent className="flex flex-wrap items-center justify-between gap-4">
          <span
            className={cn(
              "inline-flex items-center gap-2 text-sm font-medium",
              status === "disconnected" && "text-destructive",
            )}
            role="status"
          >
            <Icon
              size={18}
              aria-hidden="true"
              className={
                status === "loading" ? "motion-safe:animate-spin" : undefined
              }
            />
            {text}
          </span>
          <Button
            type="button"
            variant="outline"
            onClick={retry}
            disabled={status === "loading"}
          >
            <RefreshCw aria-hidden="true" />
            Check again
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
