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

// ===== TYPES FOR THE EXPRESS + MONGODB API =====
// Derived from the Session 1 interfaces, so those stay the source of truth.
// MongoDB sends _id (a string), and JSON turns every Date into a string.

export type ApiUser = Omit<User, "id" | "isActive"> & {
  id: string;
};

export type ApiEvent = Omit<Event, "id" | "date" | "organizerId"> & {
  _id: string;
  date: string;
  organizerId: string;
};

export type ApiRsvp = Omit<
  RSVP,
  "id" | "userId" | "eventId" | "respondedAt"
> & {
  _id: string;
  userId: string;
  eventId: string;
  respondedAt: string;
};

// What we SEND to create an RSVP: only the event.
// The server fills in the owner (from the token), the status and the date.
export type NewRsvp = Pick<ApiRsvp, "eventId">;

// Auth request and response shapes
export interface LoginBody {
  email: string;
  password: string;
}

export interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: ApiUser;
}

export interface RegisterResponse {
  message: string;
  user: ApiUser;
}