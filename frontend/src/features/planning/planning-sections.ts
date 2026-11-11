import {
  CalendarDays,
  House,
  Mail,
  Settings2,
  UsersRound,
  Wallet,
} from "lucide-react";

export const planningSections = [
  {
    slug: "",
    label: "Overview",
    icon: House,
    description: "A little clarity for your big celebration.",
  },
  {
    slug: "guests",
    label: "Guests",
    icon: UsersRound,
    description: "All your favorite people, thoughtfully brought together.",
    detail:
      "A future home for individual guests, households, reserved places, and event-specific RSVPs. Guest management is still being designed.",
  },
  {
    slug: "events",
    label: "Events",
    icon: CalendarDays,
    description: "Every beautiful chapter of your celebration.",
    detail:
      "From the engagement and mehendi to the ceremony and reception, your celebrations will each have a place. Event planning is coming in a future milestone.",
  },
  {
    slug: "invitations",
    label: "Invitations",
    icon: Mail,
    description: "The first glimpse of your happily ever after.",
    detail:
      "Personal invitations and wedding websites are part of the journey ahead. Invitation creation, sharing, and RSVP collection are not available yet.",
  },
  {
    slug: "budget",
    label: "Budget",
    icon: Wallet,
    description: "More peace of mind for the plans that matter.",
    detail:
      "Thoughtful estimates, expenses, and vendor payments are planned for a later milestone. No financial information is collected here.",
  },
  {
    slug: "settings",
    label: "Settings",
    icon: Settings2,
    description: "A space that will feel like your own.",
    detail:
      "Wedding preferences, family collaboration, and permissions will arrive as the product takes shape. Accounts and personal settings are not available yet.",
  },
] as const;

export const upcomingSections = planningSections.filter(
  (section) => section.slug && section.slug !== "settings",
);
