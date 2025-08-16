import { Router } from "express";
import { SendEmailSchema } from "../schemas/send-email.schema";
import { sendEmail } from "../services/mail";

export const sendEmailRouter = Router();

sendEmailRouter.post("/api/send-email", async (req, res) => {
  const result = SendEmailSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: "VALIDATION_ERROR", details: result.error.flatten().fieldErrors });
  }
  try {
    const { to, subject, body } = result.data;
    await sendEmail(
      to,
      subject,
      body,
      `<div><h2>Email</h2><p>${body}</p></div>`
    );
    res.json({ message: "Email sent successfully!" });
  } catch (err: any) {
    console.error("Gmail SMTP error details:", err);
    res.status(502).json({ error: "PROVIDER_ERROR", provider: "gmail-smtp", message: err.message, details: err });
  }
});
