// src/pages/EventDetailPage.tsx -- NEW FILE
import { useParams, useNavigate } from "react-router";
import EventCard from "../components/EventCard";
import { allEvents } from "../data/mockData";

function EventDetailPage() {
  // Reads whatever is in the :eventId slot of the URL
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();

  // Turn that string into a real Event object
  const event = allEvents.find((e) => e.id === Number(eventId));

  // The URL is user input -- they can type anything. Handle that.
  if (event === undefined) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        No event found with id "{eventId}".
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        {event.title}
      </h2>

      <div className="max-w-sm">
        <EventCard event={event} />
      </div>

      <button
        onClick={() => navigate("/events")}
        className="mt-4 rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Back to Events
      </button>
    </div>
  );
}

export default EventDetailPage;