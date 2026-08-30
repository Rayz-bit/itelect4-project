// src/pages/EventDetailPage.tsx -- the finished file
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import type { Event } from "../types/index";
import EventCard from "../components/EventCard";
import { fetchEventById } from "../api/client";

function EventDetailPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery<Event>({
    queryKey: ["events", eventId],
    queryFn: () => fetchEventById(eventId!),
    enabled: eventId !== undefined,
  });

  if (isPending) {
    return <div className="animate-pulse p-6">Loading event...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        {error.message}
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        {data.title}
      </h2>

      <div className="max-w-sm">
        <EventCard event={data} />
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