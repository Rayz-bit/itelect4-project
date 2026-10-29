import { z } from "zod";

// The same limits as the backend. The form checks them first, so a
// description that can't work never leaves the browser.
export const reviewFormSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(20, "Describe your event in at least 20 characters.")
    .max(2000, "Keep the description under 2000 characters."),
});

export type ReviewFormValues = z.infer<typeof reviewFormSchema>;