import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["EASY", "MEDIUM", "HARD"],
      required: true,
    },
    tags: { type: [String], default: [] },
    constraints: { type: String, required: true },
    hints: { type: String, default: "" },
    editorial: { type: String, default: "" },

    // run against every language's referenceSolution before the problem can be saved
    testCases: [
      {
        input: { type: String, required: true },
        output: { type: String, required: true },
        _id: false,
      },
    ],

    examples: {
      JAVASCRIPT: { input: String, output: String, explanation: String },
      PYTHON: { input: String, output: String, explanation: String },
      JAVA: { input: String, output: String, explanation: String },
    },
    // starter code shown to the user
    codeSnippets: {
      JAVASCRIPT: { type: String, required: true },
      PYTHON: { type: String, required: true },
      JAVA: { type: String, required: true },
    },
    // used only for validation + grading — never sent to non-admins
    referenceSolutions: {
      JAVASCRIPT: { type: String, required: true },
      PYTHON: { type: String, required: true },
      JAVA: { type: String, required: true },
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true },
);

problemSchema.index({ title: "text", tags: "text" });

const Problem = mongoose.model("Problem", problemSchema);
export default Problem;
