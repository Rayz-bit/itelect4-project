// src/api/client.ts
import type { Event, ApiRsvp, NewRsvp } from "../types/index";

export const API_URL = "http://localhost:3001";

// GET /events -> the whole list
export async function fetchEvents(): Promise<Event[]> {
  const res = await fetch(`${API_URL}/events`);
  if (!res.ok) {
    throw new Error("Could not load events");
  }
  return res.json();
}

// GET /events/:id -> a single event, using the REST path style
export async function fetchEventById(id: string): Promise<Event> {
  const res = await fetch(`${API_URL}/events/${id}`);
  if (!res.ok) {
    throw new Error(`No event found with id "${id}".`);
  }
  return res.json();
}

// GET /rsvps -> the whole list
export async function fetchRsvps(): Promise<ApiRsvp[]> {
  const res = await fetch(`${API_URL}/rsvps`);
  if (!res.ok) {
    throw new Error("Could not load RSVPs");
  }
  return res.json();
}

// POST /rsvps -> create a new RSVP
export async function createRsvp(newRsvp: NewRsvp): Promise<ApiRsvp> {
  const res = await fetch(`${API_URL}/rsvps`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newRsvp),
  });
  if (!res.ok) {
    throw new Error("Could not save the RSVP");
  }
  return res.json();
}