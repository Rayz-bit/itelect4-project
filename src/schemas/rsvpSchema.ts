import { z } from "zod";

export const rsvpSchema = z.object({
  eventId: z
    .string()
    .min(1, "Choose an event.")
    .length(24, "That is not a valid event id.")
    // .refine(): a rule Zod doesn't ship -- only hex characters allowed
    .refine((value) => /^[a-f\d]+$/i.test(value), {
      message: "That is not a valid event id.",
    }),
});

// The form's type, generated FROM the schema -- not hand-written.
export type RsvpFormValues = z.infer<typeof rsvpSchema>;