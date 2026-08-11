import Problem from "../models/Problem.js";
import ProblemSolved from "../models/ProblemSolved.js";
import {
  getLanguageId,
  submitBatch,
  pollBatchResults,
} from "../lib/codebox.js";

export async function createProblem(req, res) {
  try {
    const {
      title,
      description,
      difficulty,
      tags,
      examples,
      constraints,
      hints,
      editorial,
      testCases,
      codeSnippets,
      referenceSolutions,
    } = req.body;

    if (
      !title ||
      !description ||
      !difficulty ||
      !testCases?.length ||
      !codeSnippets ||
      !referenceSolutions
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    for (const [language, sourceCode] of Object.entries(referenceSolutions)) {
      const languageId = getLanguageId(language);
      const submissions = testCases.map(({ input, output }) => ({
        source_code: sourceCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      const submitted = await submitBatch(submissions);
      const results = await pollBatchResults(submitted.map((r) => r.token));

      const failedIndex = results.findIndex((r) => r.status?.id !== 3); // 3 = Accepted
      if (failedIndex !== -1) {
        return res.status(400).json({
          message: `Validation failed for ${language}`,
          testCase: {
            input: submissions[failedIndex].stdin,
            expected: submissions[failedIndex].expected_output,
            actualOutput: results[failedIndex].stdout,
            error:
              results[failedIndex].stderr ||
              results[failedIndex].compile_output,
          },
        });
      }
    }

    const problem = await Problem.create({
      title,
      description,
      difficulty,
      tags,
      examples,
      constraints,
      hints,
      editorial,
      testCases,
      codeSnippets,
      referenceSolutions,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Problem created successfully",
      data: problem,
    });
  } catch (error) {
    console.error("Error in createProblem controller:", error.message);
    res.status(500).json({ message: "Failed to save problem to database" });
  }
}

export async function getProblems(req, res) {
  try {
    const problems = await Problem.find().sort({ createdAt: -1 }).lean();
    const solved = await ProblemSolved.find({ user: req.user._id }).select(
      "problem",
    );
    const solvedSet = new Set(solved.map((s) => s.problem.toString()));

    res.status(200).json({
      success: true,
      data: problems.map((p) => ({
        ...p,
        isSolved: solvedSet.has(p._id.toString()),
      })),
    });
  } catch (error) {
    console.error("Error in getProblems controller:", error.message);
    res.status(500).json({ message: "Failed to fetch problems" });
  }
}

export async function getProblemById(req, res) {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: "Problem not found" });
    res.status(200).json({ success: true, data: problem });
  } catch (error) {
    console.error("Error in getProblemById controller:", error.message);
    res.status(500).json({ message: "Failed to fetch problem" });
  }
}

export async function updateProblem(req, res) {
  try {
    const { referenceSolutions, testCases } = req.body;

    if (referenceSolutions && testCases) {
      for (const [language, sourceCode] of Object.entries(referenceSolutions)) {
        const languageId = getLanguageId(language);
        const submissions = testCases.map(({ input, output }) => ({
          source_code: sourceCode,
          language_id: languageId,
          stdin: input,
          expected_output: output,
        }));

        const submitted = await submitBatch(submissions);
        const results = await pollBatchResults(submitted.map((r) => r.token));

        const failedIndex = results.findIndex((r) => r.status?.id !== 3);
        if (failedIndex !== -1) {
          return res.status(400).json({
            message: `Validation failed for ${language}`,
            testCase: {
              input: submissions[failedIndex].stdin,
              expected: submissions[failedIndex].expected_output,
              actualOutput: results[failedIndex].stdout,
              error:
                results[failedIndex].stderr ||
                results[failedIndex].compile_output,
            },
          });
        }
      }
    }

    const problem = await Problem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!problem) return res.status(404).json({ message: "Problem not found" });
    res.status(200).json({
      success: true,
      message: "Problem updated successfully",
      data: problem,
    });
  } catch (error) {
    console.error("Error in updateProblem controller:", error.message);
    res.status(500).json({ message: "Failed to update problem" });
  }
}

export async function deleteProblem(req, res) {
  try {
    const problem = await Problem.findByIdAndDelete(req.params.id);
    if (!problem) return res.status(404).json({ message: "Problem not found" });
    res
      .status(200)
      .json({ success: true, message: "Problem deleted successfully" });
  } catch (error) {
    console.error("Error in deleteProblem controller:", error.message);
    res.status(500).json({ message: "Failed to delete problem" });
  }
}
