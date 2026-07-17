// src/components/RsvpBadge.tsx
import type { RSVP } from "../types/index";

interface RsvpBadgeProps {
  rsvp: RSVP;
  children?: React.ReactNode;
}

const RsvpBadge: React.FC<RsvpBadgeProps> = ({ rsvp, children }) => {
  return (
    <div className="rsvp-badge">
      <p>Status: {rsvp.status}</p>
      <p>Responded: {rsvp.respondedAt.toLocaleDateString()}</p>
      {children}
    </div>
  );
};

export default RsvpBadge;