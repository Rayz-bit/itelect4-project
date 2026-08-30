// src/data/mockData.ts -- the finished file
// allEvents and allRsvps are DELETED. They live in db.json now,
// and the app fetches them instead of importing them.
//
// `attendee` stays. There is no /users endpoint and no real login until
// a later module -- the Home page's user is still hard-coded, on purpose.
import type { User } from "../types/index";

export const attendee: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "attendee",
  isActive: true,
};

// HomePage is the only file that still imports from here, and
// HomePage does not change at all.