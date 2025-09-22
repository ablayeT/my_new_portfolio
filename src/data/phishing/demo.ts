export type Status = "Idle" | "Running" | "Completed";

export type Campaign = {
  id: number;
  name: string;
  status: Status;
  targets: number;
  sent: number;
  clicks: number;
  credentials: number;
  domain: string;
  template: string;
};

export type CapturedMail = {
  id: number;
  to: string;
  subject: string;
  status: string;
  timestamp: string;
};

// Campagnes démo
export const mockCampaigns: Campaign[] = [
  {
    id: 1,
    name: "Awareness-Q3-DEMO",
    status: "Idle",
    targets: 25,
    sent: 0,
    clicks: 0,
    credentials: 0,
    domain: "demo.local",
    template: "Password Reset",
  },
  {
    id: 2,
    name: "Password-Reset-DEMO",
    status: "Idle",
    targets: 18,
    sent: 0,
    clicks: 0,
    credentials: 0,
    domain: "demo.local",
    template: "IT Support",
  },
  {
    id: 3,
    name: "Security-Training-DEMO",
    status: "Idle",
    targets: 32,
    sent: 0,
    clicks: 0,
    credentials: 0,
    domain: "demo.local",
    template: "HR Update",
  },
];

// Emails capturés (MailHog)
export const mockCapturedMails: CapturedMail[] = [
  {
    id: 1,
    to: "user1@demo.local",
    subject: "[DEMO] Password Reset Request",
    status: "Captured (not sent)",
    timestamp: "2024-12-15 10:30:00",
  },
  {
    id: 2,
    to: "user2@demo.local",
    subject: "[DEMO] IT Security Update",
    status: "Captured (not sent)",
    timestamp: "2024-12-15 10:28:15",
  },
  {
    id: 3,
    to: "user3@demo.local",
    subject: "[DEMO] HR Policy Changes",
    status: "Captured (not sent)",
    timestamp: "2024-12-15 10:25:42",
  },
];

export const TEMPLATE_NAMES = [
  "Password Reset",
  "IT Support",
  "HR Update",
  "Security Alert",
  "Invoice",
  "Meeting Request",
] as const;

export const TARGETS = [
  {
    email: "user1@demo.local",
    name: "Utilisateur 1",
    dept: "IT",
    status: "Actif",
  },
  {
    email: "user2@demo.local",
    name: "Utilisateur 2",
    dept: "IT",
    status: "Actif",
  },
  {
    email: "user3@demo.local",
    name: "Utilisateur 3",
    dept: "IT",
    status: "Actif",
  },
] as const;
