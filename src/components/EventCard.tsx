// src/components/EventCard.tsx
import type { Event } from "../types/index";

interface EventCardProps {
  event: Event;
}

function EventCard({ event }: EventCardProps) {
  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p>{event.location}</p>
      <p>{event.date.toLocaleDateString()} -- Capacity: {event.capacity}</p>
    </div>
  );
}

export default EventCard;