// ===== INTERFACES =====
export interface User {
  id: number;
  name: string;
  email: string;
  role: "attendee" | "organizer";
  isActive: boolean;
}

export interface Event {
  id: number;
  title: string;
  date: Date;
  location: string;
  capacity: number;
  organizerId: number;
}

export interface RSVP {
  id: number;
  userId: number;
  eventId: number;
  status: RsvpStatus;
  respondedAt: Date;
}

// ===== TYPE ALIASES =====
export type ID = number | string;

export type Coordinate = {
  x: number;
  y: number;
};

export type Formatter = (value: number) => string;

// ===== UNION TYPES =====
export type StringOrNumber = string | number;

export function printId(id: StringOrNumber): void {
  console.log(`ID: ${id}`);
}

// ===== INTERSECTION TYPES =====
export type OrganizerWithEvent = User & {
  managedEvent: Event;
};

// ===== GENERIC INTERFACE =====
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ===== GENERIC FUNCTIONS =====
export function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

export function getById<T extends { id: number }>(
  items: T[],
  id: number
): T | undefined {
  return items.find((item) => item.id === id);
}

// ===== UTILITY TYPES =====
export type UserUpdate = Partial<User>;
export type UserPreview = Pick<User, "id" | "name" | "role">;
export type PublicUser = Omit<User, "email" | "isActive">;
export type RoleCount = Record<"attendee" | "organizer", number>;

function makeRsvp(userId: number, eventId: number) {
  return { id: 1, userId, eventId, status: RsvpStatus.Pending, respondedAt: new Date() };
}
export type MakeRsvpResult = ReturnType<typeof makeRsvp>;

// ===== ENUMS =====
// Multi-step status lifecycle: pending -> confirmed -> waitlisted
export enum RsvpStatus {
  Pending = "pending",
  Confirmed = "confirmed",
  Waitlisted = "waitlisted",
}

export const enum Role {
  Attendee = "attendee",
  Organizer = "organizer",
}

// JSON has no Date, and json-server writes ids as strings. So what the
// API hands back is NOT the RSVP shape declared above.
// Both types below are DERIVED from it, so RSVP stays the single
// source of truth -- add a field there and these two inherit it.
export type ApiRsvp = Omit<RSVP, "id" | "eventId" | "respondedAt"> & {
  id: string; // json-server ids look like "z4U3v8og06g"
  eventId: string; // also a string in the raw JSON, not a number
  respondedAt: string; // an ISO string, never a Date object
};

// What we SEND when creating one. No id yet -- the server makes it.
export type NewRsvp = Omit<ApiRsvp, "id">;