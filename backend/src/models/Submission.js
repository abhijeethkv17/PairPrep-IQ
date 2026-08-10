import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
    sourceCode: { type: String, required: true },
    language: { type: String, required: true },
    status: {
      type: String,
      enum: ["Accepted", "Wrong Answer"],
      required: true,
    },
    testCaseResults: [
      {
        testCase: Number,
        passed: Boolean,
        stdout: String,
        expected: String,
        stderr: String,
        status: String,
        _id: false,
      },
    ],
  },
  { timestamps: true },
);

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;
