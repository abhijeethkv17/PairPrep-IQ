import { z } from "zod";

const codeBlockShape = z.object({
  JAVASCRIPT: z.string().min(1, "JavaScript is required"),
  PYTHON: z.string().min(1, "Python is required"),
  JAVA: z.string().min(1, "Java is required"),
});

const exampleShape = z.object({
  input: z.string().min(1, "Input is required"),
  output: z.string().min(1, "Output is required"),
  explanation: z.string().optional(),
});

export const problemSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  tags: z.array(z.string().min(1)).min(1, "At least one tag is required"),
  constraints: z.string().min(1, "Constraints are required"),
  hints: z.string().optional(),
  editorial: z.string().optional(),
  testCases: z
    .array(z.object({ input: z.string().min(1), output: z.string().min(1) }))
    .min(1, "At least one test case is required"),
  examples: z.object({
    JAVASCRIPT: exampleShape,
    PYTHON: exampleShape,
    JAVA: exampleShape,
  }),
  codeSnippets: codeBlockShape,
  referenceSolutions: codeBlockShape,
});

export const defaultProblemValues = {
  title: "",
  description: "",
  difficulty: "EASY",
  tags: [""],
  constraints: "",
  hints: "",
  editorial: "",
  testCases: [{ input: "", output: "" }],
  examples: {
    JAVASCRIPT: { input: "", output: "", explanation: "" },
    PYTHON: { input: "", output: "", explanation: "" },
    JAVA: { input: "", output: "", explanation: "" },
  },
  codeSnippets: { JAVASCRIPT: "", PYTHON: "", JAVA: "" },
  referenceSolutions: { JAVASCRIPT: "", PYTHON: "", JAVA: "" },
};
