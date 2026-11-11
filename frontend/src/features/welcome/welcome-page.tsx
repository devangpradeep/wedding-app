import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Heart,
  Leaf,
  Mail,
  Sparkles,
  UsersRound,
  Wallet,
} from "lucide-react";
import { Link } from "react-router";
import { Brand } from "@/components/brand";
import { Botanical } from "@/components/botanical";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: CalendarDays,
    title: "Every celebration, connected.",
    text: "From your first family gathering to the final dance. A place for every event, tradition, and in-between moment.",
    label: "Events & celebrations",
  },
  {
    icon: UsersRound,
    title: "Your people, at the heart.",
    text: "Big families. Close friends. Everyone who makes it yours. Thoughtful guest planning, built around real relationships.",
    label: "Guests & families",
  },
  {
    icon: Wallet,
    title: "A little more peace of mind.",
    text: "Bring the little details into focus, with a clearer view of your budget, to-dos, and the plans ahead.",
    label: "Budgets & checklists",
  },
];

export function WelcomePage() {
  return (
    <div className="welcome-page">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className="site-header page-width">
        <Brand />
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#the-little-details">The little details</a>
          <a href="#our-approach">Our approach</a>
        </nav>
        <Button asChild variant="outline" className="header-cta">
          <Link to="/dashboard">
            Explore the preview <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </header>

      <main id="main-content">
        <section className="hero page-width" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="tiny-line" /> FOR YOUR NEXT BEAUTIFUL CHAPTER
            </div>
            <h1 id="hero-title">
              Less planning.
              <br />
              More <em>butterflies.</em>
            </h1>
            <p className="hero-description">
              A thoughtful home for your wedding journey.
              <br className="desktop-break" /> Bring your people, plans, and
              celebrations together —<br className="desktop-break" /> and make
              room for the moments that matter.
            </p>
            <div className="hero-actions">
              <Button asChild size="lg">
                <Link to="/dashboard">
                  Take a little look <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <span className="preview-note">
                <span /> A beautiful beginning, in the making
              </span>
            </div>
            <a className="discover-link" href="#the-little-details">
              <span className="discover-icon">
                <ArrowDown size={16} aria-hidden="true" />
              </span>{" "}
              Thoughtfully planned. Joyfully celebrated.
            </a>
          </div>

          <div className="hero-visual">
            <div className="hero-photo-frame">
              <img
                src="/images/wedding-moment.jpg"
                alt="A newly married couple holding a bouquet of white and blush flowers in the warm evening light"
                className="hero-photo"
                width="1800"
                height="1200"
                fetchPriority="high"
              />
              <div className="photo-caption">
                <span>the beginning of</span>
                <strong>something beautiful.</strong>
              </div>
            </div>
            <div className="hero-seal" aria-hidden="true">
              <Sparkles size={24} />
              <span>
                made with love
                <br />
                for your love
              </span>
            </div>
            <div className="keepsake">
              <Heart size={18} strokeWidth={1.3} aria-hidden="true" />
              <p>
                Your day.
                <br />
                <em>Your kind of magic.</em>
              </p>
              <span>WE’LL HELP WITH THE LITTLE THINGS.</span>
            </div>
            <Botanical className="hero-botanical" />
          </div>
        </section>

        <div className="celebration-strip">
          <div className="page-width celebration-strip-inner">
            <span>ONE LOVE. SO MANY BEAUTIFUL MOMENTS.</span>
            <span className="strip-star" aria-hidden="true">
              ✧
            </span>
            <p>
              From the first <em>yes</em> to the very last dance.
            </p>
            <span className="strip-star" aria-hidden="true">
              ✧
            </span>
            <span>A LITTLE LESS TO DO. A LOT MORE TO FEEL.</span>
          </div>
        </div>

        <section
          className="features-section page-width"
          id="the-little-details"
          aria-labelledby="features-title"
        >
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                THE LITTLE DETAILS. THE BIG FEELINGS.
              </div>
              <h2 id="features-title">
                All the pieces.
                <br />
                <em>One beautiful place.</em>
              </h2>
            </div>
            <div className="section-intro">
              <p>
                A wedding is more than a day. It’s a whole world of people,
                traditions, and tiny decisions. We’re creating a calmer way to
                bring it all together.
              </p>
              <Badge className="upcoming-badge">
                <span /> ON THE HORIZON
              </Badge>
            </div>
          </div>
          <div className="feature-grid">
            {features.map(({ icon: Icon, title, text, label }, index) => (
              <article className="feature-story" key={title}>
                <div className="feature-story-top">
                  <Icon size={26} strokeWidth={1.3} aria-hidden="true" />
                  <span>0{index + 1}</span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <div className="feature-story-footer">
                  {label}
                  <span>
                    Coming soon <ArrowRight size={13} aria-hidden="true" />
                  </span>
                </div>
              </article>
            ))}
          </div>
          <p className="feature-footnote">
            <Mail size={14} aria-hidden="true" /> Personal invitations, wedding
            websites, and family collaboration are in our plans, too.
          </p>
        </section>

        <section
          className="approach-section page-width"
          id="our-approach"
          aria-labelledby="approach-title"
        >
          <div className="approach-card">
            <Botanical className="approach-botanical" />
            <div className="approach-copy">
              <div className="eyebrow">
                <Leaf size={14} aria-hidden="true" /> THOUGHTFUL BY NATURE
              </div>
              <h2 id="approach-title">
                A celebration as unique
                <br />
                as <em>the two of you.</em>
              </h2>
              <p>
                A quiet ceremony or a week of festivities. A haldi at home or a
                reception under the stars. We’re building Weddingly to make
                space for your traditions, your families, and your way of
                celebrating.
              </p>
            </div>
            <div className="approach-aside">
              <span className="approach-script">
                Together is
                <br />a beautiful place to be.
              </span>
              <div className="approach-divider" />
              <span>
                MADE FOR COUPLES.
                <br />
                WITH ROOM FOR THE WHOLE FAMILY.
              </span>
            </div>
          </div>
        </section>

        <section className="closing-section page-width">
          <span className="closing-sparkle" aria-hidden="true">
            ✧
          </span>
          <div className="eyebrow">SOMETHING LOVELY IS TAKING SHAPE</div>
          <h2>
            Your next chapter.
            <br />
            <em>A little more effortless.</em>
          </h2>
          <p>Step inside our early preview and see where the journey begins.</p>
          <Button asChild size="lg">
            <Link to="/dashboard">
              Explore Weddingly <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <span className="closing-note">
            An early preview. No account needed.
          </span>
        </section>
      </main>

      <footer className="site-footer page-width">
        <div>
          <Brand />
          <p>A little less planning. A little more celebrating.</p>
        </div>
        <div className="footer-right">
          <span>Made with care, for moments that matter.</span>
        </div>
      </footer>
    </div>
  );
}
