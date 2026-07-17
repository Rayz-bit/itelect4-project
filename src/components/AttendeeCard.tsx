// src/components/AttendeeCard.tsx (updated)
import type { User } from "../types/index";

interface AttendeeCardProps {
  user: User;
  onSelect: (user: User) => void;
}

function AttendeeCard({ user, onSelect }: AttendeeCardProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    onSelect(user);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log("Search:", e.target.value);
  };

  return (
    <div className="attendee-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>Role: {user.role}</p>
      <button onClick={handleClick}>Select</button>
      <input onChange={handleChange} placeholder="Search..." />
    </div>
  );
}

export default AttendeeCard;