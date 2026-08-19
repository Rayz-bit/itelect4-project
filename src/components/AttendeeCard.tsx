// src/components/AttendeeCard.tsx
import type { User } from "../types/index";

interface AttendeeCardProps {
  user: User;
  onSelect: (user: User) => void;
}

function AttendeeCard({ user, onSelect }: AttendeeCardProps) {
  const handleClick = (_e: React.MouseEvent<HTMLButtonElement>): void => {
    onSelect(user);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log("Search:", e.target.value);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5
      shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
        {user.name}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Role: {user.role}
      </p>
      <button
        onClick={handleClick}
        className="mt-3 rounded bg-blue-600 px-3 py-1.5 text-sm
          font-semibold text-white transition hover:bg-blue-700"
      >
        Select
      </button>
      <input
        onChange={handleChange}
        placeholder="Search..."
        className="mt-2 w-full rounded border border-gray-300 px-2 py-1
          text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
  );
}

export default AttendeeCard;