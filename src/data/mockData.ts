// src/data/mockData.ts -- NEW FILE
// Session 5 kept `attendee` and `mockEvent` at the top of App.tsx. Several
// pages need that data now, so it moves into its own file.
import type { User, Event, RSVP } from "../types/index";
import { RsvpStatus } from "../types/index";

export const attendee: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "attendee",
  isActive: true,
};

export const allEvents: Event[] = [
  {
    id: 1,
    title: "Tech Meetup 2026",
    date: new Date(),
    location: "Main Auditorium",
    capacity: 100,
    organizerId: 2,
  },
  {
    id: 2,
    title: "AI Workshop",
    date: new Date(),
    location: "Room 301",
    capacity: 40,
    organizerId: 2,
  },
  {
    id: 3,
    title: "Career Fair 2026",
    date: new Date(),
    location: "Gymnasium",
    capacity: 300,
    organizerId: 3,
  },
];

export const allRsvps: RSVP[] = [
  {
    id: 1,
    userId: 1,
    eventId: 1,
    status: RsvpStatus.Confirmed,
    respondedAt: new Date(),
  },
  {
    id: 2,
    userId: 1,
    eventId: 2,
    status: RsvpStatus.Pending,
    respondedAt: new Date(),
  },
];