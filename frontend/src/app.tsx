import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { WelcomePage } from "@/features/welcome/welcome-page";
import { OverviewPage } from "@/features/planning/overview-page";
import { UpcomingPage } from "@/features/planning/upcoming-page";
import { ApiStatusPage } from "@/features/system/api-status-page";
import { DashboardLayout } from "@/layouts/dashboard-layout";
import { NotFoundPage } from "@/pages/not-found-page";

const API_STATUS_PATH = "/dev/api-status";

function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const section = pathname.split("/").filter(Boolean).at(-1);
    const page =
      import.meta.env.DEV && pathname.replace(/\/+$/, "") === API_STATUS_PATH
        ? "API status"
        : section
          ? section.charAt(0).toUpperCase() + section.slice(1)
          : "Make room for the moments";
    document.title = `Weddingly — ${page}`;
    // Move keyboard focus into the new page after client-side navigation.
    const main = document.querySelector<HTMLElement>("#main-content");
    main?.setAttribute("tabindex", "-1");
    main?.focus({ preventScroll: true });
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <RouteEffects />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        {import.meta.env.DEV && (
          <Route path={API_STATUS_PATH} element={<ApiStatusPage />} />
        )}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path=":section" element={<UpcomingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route
          path="*"
          element={
            <main id="main-content">
              <NotFoundPage />
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
