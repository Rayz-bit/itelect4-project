// src/App.tsx
import AttendeeCard from "./components/AttendeeCard";
import EventCard from "./components/EventCard";
import RsvpBadge from "./components/RsvpBadge";
import type { User, Event, RSVP } from "./types/index";
import { RsvpStatus } from "./types/index";

const attendee: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "attendee",
  isActive: true,
};

const event: Event = {
  id: 1,
  title: "Tech Meetup 2026",
  date: new Date(),
  location: "Main Auditorium",
  capacity: 100,
  organizerId: 2,
};

const rsvp: RSVP = {
  id: 1,
  userId: 1,
  eventId: 1,
  status: RsvpStatus.Confirmed,
  respondedAt: new Date(),
};

function App() {
  return (
    <div className="app">
      <AttendeeCard
        user={attendee}
        onSelect={(u) => console.log(u)}
      />
      <EventCard event={event} />
      <RsvpBadge rsvp={rsvp}>
        <p>Confirmed!</p>
      </RsvpBadge>
    </div>
  );
}

export default App;