// src/pages/ProfilePage.tsx -- the finished file
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiRsvp, Event } from "../types/index";
import { RsvpStatus } from "../types/index";
import { rsvpSchema } from "../schemas/rsvpSchema";
import type { RsvpFormValues } from "../schemas/rsvpSchema";
import RsvpBadge from "../components/RsvpBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

  const { data, isPending, isError } = useQuery<ApiRsvp[]>({
    queryKey: ["rsvps"],
    queryFn: fetchRsvps,
  });

  const { data: events, isPending: eventsPending } = useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  const addRsvp = useMutation({
    mutationFn: createRsvp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rsvps"] });
      reset();
    },
  });

  const onSubmit = (values: RsvpFormValues): void => {
    addRsvp.mutate({
      userId: 1,
      eventId: values.eventId,
      status: RsvpStatus.Pending,
      respondedAt: new Date().toISOString(),
    });
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
            Event ID
          </Label>
          <Input
            id="eventId"
            {...register("eventId")}
            aria-invalid={errors.eventId ? true : undefined}
            placeholder="e.g. 1"
            className="dark:text-white"
          />
          {errors.eventId && (
            <p className="text-sm text-red-600">{errors.eventId.message}</p>
          )}
        </div>

        <Button type="submit" disabled={addRsvp.isPending} className="justify-self-start">
          {addRsvp.isPending ? "Saving..." : "Add RSVP"}
        </Button>
      </form>

      {addRsvp.isError && (
        <p className="mb-4 text-sm text-red-700">{addRsvp.error.message}</p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.map((r) => {
          const event = events?.find((e) => String(e.id) === r.eventId);
          return (
            <RsvpBadge key={r.id} rsvp={r}>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Event: {event?.title ?? "Unknown"} (ID: {r.eventId})
              </p>
            </RsvpBadge>
          );
        })}
      </div>
    </div>
  );
}

export default ProfilePage;