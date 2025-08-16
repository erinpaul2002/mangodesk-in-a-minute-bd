import { Router } from "express";
import { SummarizeSchema } from "../schemas/summarize.schema";
import { getGroqSummary } from "../services/ai";

export const summarizeRouter = Router();

summarizeRouter.post("/api/summarize", async (req, res) => {
  const result = SummarizeSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: "VALIDATION_ERROR", details: result.error.flatten().fieldErrors });
  }
  try {
    const summary = await getGroqSummary(result.data.transcript, result.data.prompt);
    res.json({ summary });
  } catch (err: any) {
    res.status(502).json({ error: "PROVIDER_ERROR", provider: "groq", message: err.message });
  }
});
