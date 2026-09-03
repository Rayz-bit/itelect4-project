// src/components/EventCard.tsx
import type { Event } from "../types/index";

interface EventCardProps {
  event: Event;
  variant?: "default" | "compact";
}

function EventCard({ event, variant = "default" }: EventCardProps) {
  const isCompact = variant === "compact";

  return (
    <div className={`rounded-lg border border-gray-200 bg-white shadow-sm
      dark:bg-gray-800 dark:border-gray-700 ${isCompact ? "p-3" : "p-5"}`}>
      <h3 className={`font-bold text-gray-900 dark:text-white
        ${isCompact ? "text-sm" : "text-lg"}`}>
        {event.title}
      </h3>
      {!isCompact && (
        <p className="text-gray-600 dark:text-gray-300">{event.location}</p>
      )}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {new Date(event.date).toLocaleDateString()} -- Capacity: {event.capacity}
      </p>
    </div>
  );
}

export default EventCard;