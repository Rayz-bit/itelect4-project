// src/pages/ProfilePage.tsx -- NEW FILE
import RsvpBadge from "../components/RsvpBadge";
import { allRsvps, allEvents } from "../data/mockData";

function ProfilePage() {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        My RSVPs
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {allRsvps.map((r) => {
          const event = allEvents.find((e) => e.id === r.eventId);
          return (
            <RsvpBadge key={r.id} rsvp={r}>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Event: {event?.title ?? "Unknown"}
              </p>
            </RsvpBadge>
          );
        })}
      </div>
    </div>
  );
}

export default ProfilePage;