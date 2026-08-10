import mongoose from "mongoose";

const problemSolvedSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
  },
  { timestamps: true },
);

problemSolvedSchema.index({ user: 1, problem: 1 }, { unique: true });

const ProblemSolved = mongoose.model("ProblemSolved", problemSolvedSchema);
export default ProblemSolved;
