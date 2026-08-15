import Problem from "../models/Problem.js";
import Submission from "../models/Submission.js";
import ProblemSolved from "../models/ProblemSolved.js";
import {
  getLanguageId,
  submitBatch,
  pollBatchResults,
} from "../lib/codebox.js";

// maps a Judge0 status id to one of Submission's allowed status strings
// (3 = Accepted, 4 = Wrong Answer, 5 = TLE, 6 = Compile Error, 7-14 = various Runtime Errors)
function deriveOverallStatus(results, allPassed) {
  if (allPassed) return "Accepted";

  const firstFailure = results.find((r) => r.status?.id !== 3);
  const statusId = firstFailure?.status?.id;

  if (statusId === 6) return "Compile Error";
  if (statusId === 5) return "Time Limit Exceeded";
  if (statusId >= 7 && statusId <= 14) return "Runtime Error";

  return "Wrong Answer";
}

export async function submitSolution(req, res) {
  try {
    const { id } = req.params;
    const { language, sourceCode } = req.body;

    if (!language || !sourceCode) {
      return res
        .status(400)
        .json({ message: "language and sourceCode are required" });
    }

    const problem = await Problem.findById(id);
    if (!problem) return res.status(404).json({ message: "Problem not found" });

    const languageId = getLanguageId(language);
    if (!languageId) {
      return res
        .status(400)
        .json({ message: `Unsupported language: ${language}` });
    }
    const submissions = problem.testCases.map(({ input, output }) => ({
      source_code: sourceCode,
      language_id: languageId,
      stdin: input,
      expected_output: output,
    }));

    const submitted = await submitBatch(submissions);
    const results = await pollBatchResults(submitted.map((r) => r.token));

    let allPassed = true;
    const testCaseResults = results.map((result, i) => {
      const passed = result.status?.id === 3;
      if (!passed) allPassed = false;
      return {
        testCase: i + 1,
        passed,
        stdout: result.stdout,
        expected: submissions[i].expected_output,
        stderr: result.stderr,
        status: result.status?.description,
      };
    });

    const submission = await Submission.create({
      user: req.user._id,
      problem: id,
      sourceCode,
      language,
      status: deriveOverallStatus(results, allPassed),
      testCaseResults,
    });

    if (allPassed) {
      await ProblemSolved.updateOne(
        { user: req.user._id, problem: id },
        {},
        { upsert: true },
      );
    }

    res.status(200).json({ success: true, submission });
  } catch (error) {
    console.error("Error in submitSolution controller:", error.message);
    res.status(500).json({ message: "Failed to execute submission" });
  }
}
