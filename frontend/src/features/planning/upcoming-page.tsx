import { ArrowLeft, Flower2 } from "lucide-react";
import { Link, useParams } from "react-router";
import { Botanical } from "@/components/botanical";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { planningSections } from "./planning-sections";
import { NotFoundPage } from "@/pages/not-found-page";

export function UpcomingPage() {
  const { section: slug } = useParams();
  const section = planningSections.find(
    (item) => item.slug === slug && item.slug !== "",
  );
  if (!section || !("detail" in section)) return <NotFoundPage />;
  const Icon = section.icon;

  return (
    <>
      <div className="dashboard-page-heading">
        <div className="eyebrow">YOUR PLANNING SPACE</div>
        <h1>
          {section.label}
          <span className="heading-dot">.</span>
        </h1>
        <p>{section.description}</p>
      </div>
      <section className="upcoming-panel" aria-labelledby="upcoming-title">
        <Botanical />
        <span className="upcoming-icon">
          <Icon size={34} strokeWidth={1.2} aria-hidden="true" />
        </span>
        <Badge className="upcoming-badge">
          <span /> COMING IN A FUTURE MILESTONE
        </Badge>
        <h2 id="upcoming-title">
          A little patience.
          <br />
          <em>Something lovely is growing.</em>
        </h2>
        <p>{section.detail}</p>
        <Button asChild variant="outline">
          <Link to="/dashboard">
            <ArrowLeft aria-hidden="true" /> Back to overview
          </Link>
        </Button>
        <div className="upcoming-panel-note">
          <Flower2 size={15} aria-hidden="true" /> A preview of what’s ahead. No
          data is collected or saved.
        </div>
      </section>
    </>
  );
}
