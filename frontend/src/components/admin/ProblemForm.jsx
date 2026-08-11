import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, TrashIcon } from "lucide-react";
import {
  problemSchema,
  defaultProblemValues,
} from "../../schema/problemSchema";

const LANGUAGES = ["JAVASCRIPT", "PYTHON", "JAVA"];

function ProblemForm({
  defaultValues = defaultProblemValues,
  onSubmit,
  isSubmitting,
  submitLabel = "Create Problem",
}) {
  const [activeLang, setActiveLang] = useState("JAVASCRIPT");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(problemSchema), defaultValues });

  const testCasesArray = useFieldArray({ control, name: "testCases" });
  const tagsArray = useFieldArray({ control, name: "tags" });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* BASIC INFO */}
      <div className="card bg-base-100 shadow p-6 space-y-4">
        <h2 className="font-bold text-lg">Basic Info</h2>

        <div>
          <label className="label">Title</label>
          <input
            className="input input-bordered w-full"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-error text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="label">Description</label>
          <textarea
            className="textarea textarea-bordered w-full h-32"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-error text-sm">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="label">Difficulty</label>
          <select
            className="select select-bordered w-full max-w-xs"
            {...register("difficulty")}
          >
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </div>

        <div>
          <label className="label">Constraints</label>
          <textarea
            className="textarea textarea-bordered w-full h-24"
            {...register("constraints")}
          />
          {errors.constraints && (
            <p className="text-error text-sm">{errors.constraints.message}</p>
          )}
        </div>

        <div>
          <label className="label">Hints (optional)</label>
          <textarea
            className="textarea textarea-bordered w-full"
            {...register("hints")}
          />
        </div>

        <div>
          <label className="label">Editorial (optional)</label>
          <textarea
            className="textarea textarea-bordered w-full"
            {...register("editorial")}
          />
        </div>
      </div>

      {/* TAGS */}
      <div className="card bg-base-100 shadow p-6 space-y-3">
        <h2 className="font-bold text-lg">Tags</h2>
        {tagsArray.fields.map((field, idx) => (
          <div key={field.id} className="flex gap-2">
            <input
              className="input input-bordered flex-1"
              {...register(`tags.${idx}`)}
              placeholder="e.g. Array"
            />
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => tagsArray.remove(idx)}
            >
              <TrashIcon className="size-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-outline btn-sm gap-2"
          onClick={() => tagsArray.append("")}
        >
          <PlusIcon className="size-4" /> Add Tag
        </button>
        {errors.tags && (
          <p className="text-error text-sm">{errors.tags.message}</p>
        )}
      </div>

      {/* TEST CASES */}
      <div className="card bg-base-100 shadow p-6 space-y-3">
        <h2 className="font-bold text-lg">Test Cases</h2>
        <p className="text-sm text-base-content/60">
          Every reference solution below is run against every test case before
          this problem can be saved.
        </p>
        {testCasesArray.fields.map((field, idx) => (
          <div
            key={field.id}
            className="grid grid-cols-2 gap-2 items-start border-b pb-3"
          >
            <div>
              <label className="label text-xs">Input (stdin)</label>
              <textarea
                className="textarea textarea-bordered w-full font-mono text-sm"
                {...register(`testCases.${idx}.input`)}
              />
            </div>
            <div>
              <label className="label text-xs">Expected Output</label>
              <textarea
                className="textarea textarea-bordered w-full font-mono text-sm"
                {...register(`testCases.${idx}.output`)}
              />
            </div>
            <button
              type="button"
              className="btn btn-ghost btn-xs col-span-2 justify-self-end"
              onClick={() => testCasesArray.remove(idx)}
            >
              Remove test case
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-outline btn-sm gap-2"
          onClick={() => testCasesArray.append({ input: "", output: "" })}
        >
          <PlusIcon className="size-4" /> Add Test Case
        </button>
        {errors.testCases && (
          <p className="text-error text-sm">{errors.testCases.message}</p>
        )}
      </div>

      {/* PER-LANGUAGE CODE */}
      <div className="card bg-base-100 shadow p-6 space-y-4">
        <h2 className="font-bold text-lg">Per-Language Code</h2>

        <div className="tabs tabs-boxed w-fit">
          {LANGUAGES.map((lang) => (
            <button
              type="button"
              key={lang}
              className={`tab ${activeLang === lang ? "tab-active" : ""}`}
              onClick={() => setActiveLang(lang)}
            >
              {lang}
            </button>
          ))}
        </div>

        <div>
          <label className="label">Example Input</label>
          <input
            className="input input-bordered w-full font-mono text-sm"
            {...register(`examples.${activeLang}.input`)}
          />
        </div>
        <div>
          <label className="label">Example Output</label>
          <input
            className="input input-bordered w-full font-mono text-sm"
            {...register(`examples.${activeLang}.output`)}
          />
        </div>
        <div>
          <label className="label">Example Explanation (optional)</label>
          <input
            className="input input-bordered w-full"
            {...register(`examples.${activeLang}.explanation`)}
          />
        </div>

        <div>
          <label className="label">Starter Code (shown to the user)</label>
          <textarea
            className="textarea textarea-bordered w-full h-40 font-mono text-sm"
            {...register(`codeSnippets.${activeLang}`)}
          />
        </div>

        <div>
          <label className="label">
            Reference Solution (used to validate test cases — not shown to
            users)
          </label>
          <textarea
            className="textarea textarea-bordered w-full h-40 font-mono text-sm"
            {...register(`referenceSolutions.${activeLang}`)}
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? "Validating & Saving..." : submitLabel}
      </button>
    </form>
  );
}

export default ProblemForm;
