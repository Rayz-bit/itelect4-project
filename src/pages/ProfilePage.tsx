import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiEvent, ApiRsvp } from "../types/index";
import { rsvpSchema } from "../schemas/rsvpSchema";
import type { RsvpFormValues } from "../schemas/rsvpSchema";
import RsvpBadge from "../components/RsvpBadge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { fetchRsvps, createRsvp, fetchEvents } from "../api/client";

function ProfilePage() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema),
    mode: "onBlur",
    defaultValues: { eventId: "" },
  });

  // READ -- my RSVPs (private: needs the token)
  const { data, isPending, isError } = useQuery<ApiRsvp[]>({
    queryKey: ["rsvps"],
    queryFn: fetchRsvps,
  });

  // READ -- the events list, for the dropdown and the titles
  const { data: events, isPending: eventsPending } = useQuery<ApiEvent[]>({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  // WRITE -- the server fills in the owner, status and date
  const addRsvp = useMutation({
    mutationFn: createRsvp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rsvps"] });
      reset();
    },
  });

  const onSubmit = (values: RsvpFormValues): void => {
    addRsvp.mutate({ eventId: values.eventId });
  };

  if (isPending || eventsPending) {
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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-6 grid gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
      >
        <div className="grid gap-1.5">
          <Label htmlFor="eventId" className="text-foreground">
            Event
          </Label>
          <select
            id="eventId"
            {...register("eventId")}
            aria-invalid={errors.eventId ? true : undefined}
            className="h-8 w-full rounded-lg border border-input bg-background px-2.5 text-sm text-foreground aria-invalid:border-destructive"
          >
            <option value="">Select an event...</option>
            {events?.map((e) => (
              <option key={e._id} value={e._id}>
                {e.title}
              </option>
            ))}
          </select>
          {errors.eventId && (
            <p className="text-sm text-red-600">{errors.eventId.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={addRsvp.isPending}
          className="justify-self-start"
        >
          {addRsvp.isPending ? "Saving..." : "RSVP"}
        </Button>
      </form>

      {addRsvp.isError && (
        <p className="mb-4 text-sm text-red-700">{addRsvp.error.message}</p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.map((r) => {
          const event = events?.find((e) => e._id === r.eventId);
          return (
            <RsvpBadge key={r._id} rsvp={r}>
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