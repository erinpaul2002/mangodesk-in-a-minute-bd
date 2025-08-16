import { SummarizeSchema } from "./summarize.schema";

describe("SummarizeSchema", () => {
  it("validates a correct payload", () => {
    const data = {
      transcript: "Meeting notes here.",
      prompt: "Summarize in bullet points."
    };
    expect(() => SummarizeSchema.parse(data)).not.toThrow();
  });

  it("fails on empty transcript", () => {
    const data = { transcript: "", prompt: "Anything" };
    expect(() => SummarizeSchema.parse(data)).toThrow();
  });

  it("fails on too long transcript", () => {
    const data = { transcript: "a".repeat(200_001) };
    expect(() => SummarizeSchema.parse(data)).toThrow();
  });
});
