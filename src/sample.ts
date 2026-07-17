// src/sample.ts
import type { User } from "./types/index";

// Function: getUser
// We combine User with { checkedIn: boolean } so TypeScript knows the returned object includes check-in status.
function getUser(id: number): User & { checkedIn: boolean } {
  return {
    id: id,
    name: "Rayz Gabriel Lasi",
    email: "rayzgabriel.lasi@example.com",
    role: "attendee",
    isActive: true,
    checkedIn: true,
  };
}

// Function: getRsvpSummary
function getRsvpSummary(confirmed: number, capacity: number): string {
  const percentage: number = (confirmed / capacity) * 100;
  if (percentage >= 90) return "Nearly full";
  if (percentage >= 70) return "Filling up";
  if (percentage >= 40) return "Open";
  return "Just opened";
}

// Function: formatEvent
function formatEvent(title: string, capacity: number, location: string): string {
  return `${title} (${capacity} seats) - ${location}`;
}

// Usage
const user = getUser(1);
console.log(user);

const rsvpSummary: string = getRsvpSummary(85, 100);
console.log(rsvpSummary);

const eventInfo: string = formatEvent("Tech Meetup 2026", 100, "Main Auditorium");
console.log(eventInfo);