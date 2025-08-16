import { z } from "zod";

export const SendEmailSchema = z.object({
  to: z.array(z.string().email()).min(1).max(10),
  subject: z.string().min(3).max(120),
  body: z.string().min(1).max(200_000)
});
export type SendEmailInput = z.infer<typeof SendEmailSchema>;
