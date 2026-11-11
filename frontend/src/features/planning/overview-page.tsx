import { ArrowRight, Flower2, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { upcomingSections } from "./planning-sections";

export function OverviewPage() {
  return (
    <>
      <div className="dashboard-page-heading">
        <div className="eyebrow">LET THE BEAUTIFUL THINGS BEGIN</div>
        <h1>
          A little space for <em>your big day.</em>
        </h1>
        <p>Welcome to Weddingly. Your planning journey is taking shape.</p>
      </div>

      <section className="dashboard-welcome" aria-labelledby="welcome-title">
        <div className="dashboard-welcome-copy">
          <span className="welcome-mini-icon">
            <Heart size={23} strokeWidth={1.2} aria-hidden="true" />
          </span>
          <h2 id="welcome-title">
            The best part?
            <br />
            <em>It’s only the beginning.</em>
          </h2>
          <p>
            One day, this will be home to your people, celebrations, and all the
            little details. For now, take a look around the space we’re creating
            for you.
          </p>
          <span className="welcome-caption">
            <Sparkles size={14} aria-hidden="true" /> A thoughtful foundation. A
            lovely journey ahead.
          </span>
        </div>
        <div className="dashboard-welcome-photo">
          <img
            src="/images/wedding-moment.jpg"
            alt="A wedding bouquet of white and blush flowers in golden evening light"
            width="1800"
            height="1200"
          />
          <span>A moment to remember.</span>
        </div>
      </section>

      <div className="planning-heading">
        <div>
          <h2>Room for every little detail.</h2>
          <p>A glimpse of what’s coming to your planning space.</p>
        </div>
        <Badge>IN THE MAKING</Badge>
      </div>
      <div className="planning-card-grid">
        {upcomingSections.map(({ slug, label, icon: Icon, description }) => (
          <Link
            to={`/dashboard/${slug}`}
            key={slug}
            className="planning-card-link"
          >
            <Card className="planning-card">
              <CardContent>
                <div className="planning-card-top">
                  <span className="planning-card-icon">
                    <Icon size={21} strokeWidth={1.4} aria-hidden="true" />
                  </span>
                  <Badge>Coming soon</Badge>
                </div>
                <h3>{label}</h3>
                <p>{description}</p>
                <span className="planning-card-bottom">
                  See what’s ahead <ArrowRight size={16} aria-hidden="true" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <aside className="foundation-note">
        <Flower2 size={25} strokeWidth={1.2} aria-hidden="true" />
        <div>
          <strong>Good things take a little growing.</strong>
          <p>
            This is an early preview of Weddingly. Wedding setup and planning
            tools are coming in future milestones. Nothing you see here
            represents a real wedding or saved planning data.
          </p>
        </div>
      </aside>
    </>
  );
}
