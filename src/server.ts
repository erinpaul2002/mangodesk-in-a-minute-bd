import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { healthRouter } from "./routes/health";
import { summarizeRouter } from "./routes/summarize";
import { sendEmailRouter } from "./routes/sendEmail";

dotenv.config();

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || "*",
  })
);
app.use(express.json({ limit: "300kb" }));

app.use(healthRouter);
app.use(summarizeRouter);
app.use(sendEmailRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Mangodesk backend running on port ${PORT}`);
});
