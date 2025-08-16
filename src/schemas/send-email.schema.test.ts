import { SendEmailSchema } from "./send-email.schema";

describe("SendEmailSchema", () => {
  it("validates a correct payload", () => {
    const data = {
      to: ["user@example.com"],
      subject: "Meeting Summary",
      body: "Summary content."
    };
    expect(() => SendEmailSchema.parse(data)).not.toThrow();
  });

  it("fails on invalid email", () => {
    const data = {
      to: ["not-an-email"],
      subject: "Meeting Summary",
      body: "Summary content."
    };
    expect(() => SendEmailSchema.parse(data)).toThrow();
  });

  it("fails on empty body", () => {
    const data = {
      to: ["user@example.com"],
      subject: "Meeting Summary",
      body: ""
    };
    expect(() => SendEmailSchema.parse(data)).toThrow();
  });
});
