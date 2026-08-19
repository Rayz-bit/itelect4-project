// src/components/RsvpBadge.tsx
import type { RSVP } from "../types/index";

interface RsvpBadgeProps {
  rsvp: RSVP;
  children?: React.ReactNode;
}

const RsvpBadge: React.FC<RsvpBadgeProps> = ({ rsvp, children }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <p className="text-gray-900 dark:text-white">
        Status: <span className="font-semibold capitalize">{rsvp.status}</span>
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Responded: {rsvp.respondedAt.toLocaleDateString()}
      </p>
      {children}
    </div>
  );
};

export default RsvpBadge;