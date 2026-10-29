import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RsvpBadge from "./RsvpBadge";
import { RsvpStatus } from "../types/index";
import type { ApiRsvp } from "../types/index";

// One RSVP shaped exactly like a row from GET /api/rsvps. Typed, so a
// field that doesn't exist in ApiRsvp is a compile error here too.
const pending: ApiRsvp = {
  _id: "665f1c2ab4e8d3a1f0c9e101",
  userId: "665f1c2ab4e8d3a1f0c9e001",
  eventId: "665f1c2ab4e8d3a1f0c9e201",
  status: RsvpStatus.Pending,
  respondedAt: "2026-10-17T02:15:00.000Z",
};

describe("RsvpBadge", () => {
  it("shows the status the RSVP has", () => {
    render(<RsvpBadge rsvp={pending} />);

    expect(screen.getByText("pending")).toBeInTheDocument();
  });

  it("shows a different status when the prop changes", () => {
    const confirmed: ApiRsvp = { ...pending, status: RsvpStatus.Confirmed };

    render(<RsvpBadge rsvp={confirmed} />);

    expect(screen.getByText("confirmed")).toBeInTheDocument();
    expect(screen.queryByText("pending")).not.toBeInTheDocument();
  });

  it("shows whatever is passed as children", () => {
    render(
      <RsvpBadge rsvp={pending}>
        <p>Event: Tech Meetup 2026</p>
      </RsvpBadge>
    );

    expect(screen.getByText("Event: Tech Meetup 2026")).toBeInTheDocument();
  });
});