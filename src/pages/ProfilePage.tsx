// src/pages/ProfilePage.tsx -- the finished file
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiRsvp } from "../types/index";
import { RsvpStatus } from "../types/index";
import RsvpBadge from "../components/RsvpBadge";
import { fetchRsvps, createRsvp } from "../api/client";
// The mockData import is GONE -- allRsvps no longer exists

function ProfilePage() {
  // Local, because only this one form reads it. Not store material.
  const [eventId, setEventId] = useState<string>("");

  const queryClient = useQueryClient();

  // 1. READ -- exactly the same useQuery pattern as EventsPage
  const { data, isPending, isError } = useQuery<ApiRsvp[]>({
    queryKey: ["rsvps"],
    queryFn: fetchRsvps,
  });

  // 2. WRITE -- mutationFn does the POST, onSuccess cleans up after it
  const addRsvp = useMutation({
    mutationFn: createRsvp,
    onSuccess: () => {
      // "the rsvps list is out of date now -- go and refetch it"
      queryClient.invalidateQueries({ queryKey: ["rsvps"] });
      setEventId("");
    },
  });

  // mutate() is what an event handler calls. It does not return the
  // result -- you read that off addRsvp afterwards.
  const handleAdd = (): void => {
    addRsvp.mutate({
      userId: 1,
      eventId: eventId,
      status: RsvpStatus.Pending,
      respondedAt: new Date().toISOString(), // a STRING, not a Date
    });
  };

  if (isPending) {
    return <div className="animate-pulse p-6">Loading RSVPs...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        Could not load RSVPs.
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        My RSVPs
      </h2>

      <div className="mb-6 flex gap-2">
        <input
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
          placeholder="Event ID (e.g. 1)"
          className="w-full rounded border border-gray-300 p-2"
        />
        <button
          onClick={handleAdd}
          disabled={eventId === "" || addRsvp.isPending}
          className="rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:bg-gray-400"
        >
          {addRsvp.isPending ? "Saving..." : "Add"}
        </button>
      </div>

      {addRsvp.isError && (
        <p className="mb-4 text-sm text-red-700">
          {addRsvp.error.message}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.map((r) => (
          <RsvpBadge key={r.id} rsvp={r}>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Event ID: {r.eventId}
            </p>
          </RsvpBadge>
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;