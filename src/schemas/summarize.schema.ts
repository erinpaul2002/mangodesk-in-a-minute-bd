import { z } from "zod";

export const SummarizeSchema = z.object({
  transcript: z.string().min(1).max(200_000),
  prompt: z.string().max(1_000).optional().default("Summarize the transcript.")
});
export type SummarizeInput = z.infer<typeof SummarizeSchema>;
