// src/schemas/rsvpSchema.ts
import { z } from "zod";

// A schema: a value that still exists at runtime -- unlike a TS type,
// which is erased before the code runs.
export const rsvpSchema = z.object({
  eventId: z
    .string()
    .min(1, "Event ID is required.")
    // .refine() adds any rule Zod does not ship: yours, as a function.
    .refine((val) => /^\d+$/.test(val), {
      message: "Event ID must be a number, like 1 or 2.",
    })
    .refine((val) => Number(val) > 0, {
      message: "Event ID must be a positive number.",
    }),
});

// The TypeScript type, generated FROM the schema -- not hand-written.
export type RsvpFormValues = z.infer<typeof rsvpSchema>;