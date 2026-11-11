import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <div className="not-found-page">
      <Brand />
      <div className="eyebrow">404 · A LITTLE DETOUR</div>
      <h1>
        This page has
        <br />
        <em>wandered off.</em>
      </h1>
      <p>Let’s get you back to a beautiful beginning.</p>
      <Button asChild>
        <Link to="/">
          <ArrowLeft aria-hidden="true" /> Back to Weddingly
        </Link>
      </Button>
    </div>
  );
}
