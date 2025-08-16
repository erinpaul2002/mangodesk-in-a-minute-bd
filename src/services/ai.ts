import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const MODEL = "llama-3.3-70b-versatile";

export async function getGroqSummary(transcript: string, prompt: string): Promise<string> {
  if (!GROQ_API_KEY) throw new Error("GROQ_API_KEY not set");

  const systemPrompt = "You are a concise assistant that produces structured, action-oriented meeting summaries.";
  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: `${prompt}\nTranscript:\n"""${transcript}"""` }
  ];

  const response = await axios.post(GROQ_API_URL, {
    model: MODEL,
    messages
  }, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${GROQ_API_KEY}`
    }
  });

  const data = response.data;
  return data.choices?.[0]?.message?.content?.trim() || "";
}
