import { getDifficultyBadgeClass } from "../lib/utils";

function ProblemDescription({ problem, selectedLanguage }) {
  const example = problem.examples?.[selectedLanguage?.toUpperCase()];

  return (
    <div className="h-full overflow-y-auto bg-base-200">
      <div className="p-6 bg-base-100 border-b border-base-300">
        <div className="flex items-start justify-between mb-3">
          <h1 className="text-3xl font-bold text-base-content">
            {problem.title}
          </h1>
          <span
            className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}
          >
            {problem.difficulty.charAt(0) +
              problem.difficulty.slice(1).toLowerCase()}
          </span>
        </div>
        <p className="text-base-content/60">{problem.tags?.join(", ")}</p>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
          <h2 className="text-xl font-bold text-base-content">Description</h2>
          <p className="text-base-content/90 whitespace-pre-wrap">
            {problem.description}
          </p>
        </div>

        {example && (
          <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
            <h2 className="text-xl font-bold mb-4 text-base-content">
              Example
            </h2>
            <div className="bg-base-200 rounded-lg p-4 font-mono text-sm space-y-1.5">
              <div className="flex gap-2">
                <span className="text-primary font-bold min-w-[70px]">
                  Input:
                </span>
                <span>{example.input}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-secondary font-bold min-w-[70px]">
                  Output:
                </span>
                <span>{example.output}</span>
              </div>
              {example.explanation && (
                <div className="pt-2 border-t border-base-300 mt-2">
                  <span className="text-base-content/60 font-sans text-xs">
                    <span className="font-semibold">Explanation:</span>{" "}
                    {example.explanation}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
          <h2 className="text-xl font-bold mb-4 text-base-content">
            Constraints
          </h2>
          <p className="text-sm text-base-content/90 whitespace-pre-wrap font-mono">
            {problem.constraints}
          </p>
        </div>

        {problem.hints && (
          <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
            <h2 className="text-xl font-bold mb-2 text-base-content">Hint</h2>
            <p className="text-base-content/80 text-sm">{problem.hints}</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default ProblemDescription;
