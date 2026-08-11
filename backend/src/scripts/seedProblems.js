import mongoose from "mongoose";
import { connectDB } from "../lib/db.js";
import Problem from "../models/Problem.js";
import User from "../models/User.js";
import { PROBLEMS } from "../../../frontend/src/data/problems.js";

const run = async () => {
  await connectDB();

  const admin = await User.findOne({ role: "admin" });
  if (!admin) {
    console.error(
      "No admin user found — set ADMIN_EMAILS and sign up first, or flip a user's role in Mongo.",
    );
    process.exit(1);
  }

  for (const key of Object.keys(PROBLEMS)) {
    const old = PROBLEMS[key];

    const exampleForLang = (lang) => {
      const first = old.examples?.[0];
      return {
        input: first?.input || "",
        output: first?.output || "",
        explanation: first?.explanation || "",
      };
    };

    await Problem.create({
      title: old.title,
      description: old.description?.text || "",
      difficulty: old.difficulty.toUpperCase(),
      tags: old.category ? old.category.split("•").map((t) => t.trim()) : [],
      constraints: (old.constraints || []).join("\n"),
      testCases: (old.examples || []).map((ex) => ({
        input: ex.input,
        output: ex.output,
      })),
      examples: {
        JAVASCRIPT: exampleForLang("javascript"),
        PYTHON: exampleForLang("python"),
        JAVA: exampleForLang("java"),
      },
      codeSnippets: {
        JAVASCRIPT: old.starterCode?.javascript || "",
        PYTHON: old.starterCode?.python || "",
        JAVA: old.starterCode?.java || "",
      },
      referenceSolutions: {
        JAVASCRIPT:
          "// TODO: add a real reference solution, then re-save via the Edit page",
        PYTHON:
          "# TODO: add a real reference solution, then re-save via the Edit page",
        JAVA: "// TODO: add a real reference solution, then re-save via the Edit page",
      },
      createdBy: admin._id,
    });

    console.log(`Seeded: ${old.title}`);
  }

  await mongoose.disconnect();
  console.log("Done.");
};

run();
