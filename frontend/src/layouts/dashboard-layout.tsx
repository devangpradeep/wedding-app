import { ArrowLeft, ArrowUpRight, Heart } from "lucide-react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { Brand } from "@/components/brand";
import { Botanical } from "@/components/botanical";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { planningSections } from "@/features/planning/planning-sections";

export function DashboardLayout() {
  const { pathname } = useLocation();
  const normalizedPathname = pathname.replace(/\/+$/, "");
  const section = planningSections.find(
    (item) =>
      normalizedPathname === `/dashboard${item.slug ? `/${item.slug}` : ""}`,
  );

  return (
    <div className="dashboard-layout">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <Brand />
          <span>YOUR PLANNING SPACE</span>
        </div>
        <div className="workspace-label">
          <span className="workspace-icon">
            <Heart size={17} strokeWidth={1.4} aria-hidden="true" />
          </span>
          <div>
            <strong>A beautiful beginning</strong>
            <span>Your wedding, your way</span>
          </div>
          <Badge>PREVIEW</Badge>
        </div>
        <nav className="dashboard-nav" aria-label="Planning navigation">
          {planningSections.map(({ slug, label, icon: Icon }) => (
            <NavLink
              to={`/dashboard${slug ? `/${slug}` : ""}`}
              end={!slug}
              key={label}
            >
              <Icon size={19} strokeWidth={1.5} aria-hidden="true" />
              <span>{label}</span>
              {slug && <span className="nav-soon">Soon</span>}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-note">
            <Botanical />
            <span>A NOTE FROM US</span>
            <p>
              Here’s to the joy
              <br />
              <em>in the journey.</em>
            </p>
            <small>
              Something thoughtful is growing here.
              <br />
              We’re glad you’re along for it.
            </small>
          </div>
          <Link to="/" className="back-home">
            <ArrowLeft size={14} aria-hidden="true" /> Back to Weddingly
          </Link>
        </div>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <span>Your planning space</span>
            <span className="breadcrumb-divider">/</span>
            <strong>{section?.label ?? "Page not found"}</strong>
          </div>
          <div className="dashboard-header-actions">
            <Badge className="preview-badge">
              <span /> EARLY PREVIEW
            </Badge>
            <Button asChild size="sm" variant="ghost">
              <Link to="/">
                Visit welcome page <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </header>
        <main id="main-content" className="dashboard-content">
          <Outlet />
        </main>
        <footer className="dashboard-footer">
          <span>Made for your moments. Built with care.</span>
        </footer>
      </div>
    </div>
  );
}
