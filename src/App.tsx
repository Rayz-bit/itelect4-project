// src/App.tsx
import { useState, useEffect, useRef } from "react";
import type { User, Event, RSVP } from "./types/index";
import { RsvpStatus } from "./types/index";
import AttendeeCard from "./components/AttendeeCard";
import EventCard from "./components/EventCard";
import RsvpBadge from "./components/RsvpBadge";
import useToggle from "./hooks/useToggle";
import usePrevious from "./hooks/usePrevious";

const attendee: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "attendee",
  isActive: true,
};

const mockEvent: Event = {
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
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [showDetails, toggleDetails] = useToggle(false);
  const previousSearch = usePrevious(searchTerm);

  const focusSearch = (): void => {
    searchInputRef.current?.focus();
  };

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => setSearchTerm(e.target.value);

  useEffect(() => {
    setTimeout(() => {
      setEvents([mockEvent]);
      setIsLoading(false);
      focusSearch();
    }, 500);
  }, []);

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <p>Loading events...</p>;

  return (
    <div className="app">
      <input
        ref={searchInputRef}
        value={searchTerm}
        type="text"
        placeholder="Search events..."
        onChange={handleSearchChange}
      />

      {previousSearch !== undefined && previousSearch !== searchTerm && (
        <p>Previous search: "{previousSearch}"</p>
      )}

      <AttendeeCard user={attendee} onSelect={setSelectedUser} />
      {selectedUser && <p>Selected: {selectedUser.name}</p>}

      <button onClick={toggleDetails}>
        {showDetails ? "Hide" : "Show"} Details
      </button>

      {filteredEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}

      {showDetails && (
        <RsvpBadge rsvp={rsvp}>
          <p>Confirmed!</p>
        </RsvpBadge>
      )}
    </div>
  );
}

export default App;