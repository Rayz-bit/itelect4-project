import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { reviewFormSchema } from "../schemas/aiSchema";
import type { ReviewFormValues } from "../schemas/aiSchema";
import type { AiReview, Readiness } from "../types/index";
import { askAi } from "../api/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// One badge per readiness value
const readinessBadge: Record<Readiness, { label: string; className: string }> = {
  ready: {
    label: "Ready to publish",
    className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  },
  needs_work: {
    label: "Needs work",
    className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  },
  not_ready: {
    label: "Not ready",
    className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  },
};

function ReviewPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    mode: "onBlur",
    defaultValues: { prompt: "" },
  });

  const review = useMutation<AiReview, Error, ReviewFormValues>({
    mutationFn: (values) => askAi({ prompt: values.prompt }),
  });

  // Runs only if the schema passes, so an invalid form sends no request
  const onSubmit = (values: ReviewFormValues): void => {
    review.mutate(values);
  };

  return (
    <div className="max-w-2xl">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        AI Review
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
      >
        <div className="grid gap-1.5">
          <Label htmlFor="prompt" className="text-foreground">
            Describe your event
          </Label>
          <textarea
            id="prompt"
            rows={6}
            {...register("prompt")}
            aria-invalid={errors.prompt ? true : undefined}
            placeholder="Date, time, venue, who it is for, how many seats, how to RSVP..."
            className="w-full rounded-lg border border-input bg-background px-2.5 py-2 text-sm text-foreground aria-invalid:border-destructive dark:text-white"
          />
          {errors.prompt && (
            <p className="text-sm text-red-600">{errors.prompt.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={review.isPending}
          className="justify-self-start"
        >
          {review.isPending ? "Reviewing..." : "Review my event"}
        </Button>
      </form>

      {review.isError && (
        <p className="mt-4 text-sm text-red-700">{review.error.message}</p>
      )}

      {review.data && (
        <div className="mt-6 grid gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <span
            className={`w-fit rounded-full px-3 py-1 text-sm font-semibold ${readinessBadge[review.data.readiness].className}`}
          >
            {readinessBadge[review.data.readiness].label}
          </span>

          <p className="text-gray-900 dark:text-white">{review.data.summary}</p>

          <div>
            <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
              Strengths
            </h3>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
              {review.data.strengths.map((item, index) => (
                <li key={`${index}-${item}`}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
              To improve
            </h3>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
              {review.data.improvements.map((item, index) => (
                <li key={`${index}-${item}`}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewPage;