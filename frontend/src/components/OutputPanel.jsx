function OutputPanel({ output }) {
  return (
    <div className="h-full bg-base-100 flex flex-col">
      <div className="px-4 py-2 bg-base-200 border-b border-base-300 font-semibold text-sm flex items-center justify-between">
        <span>Output</span>
        {output && (
          <span
            className={`badge ${output.status === "Accepted" ? "badge-success" : "badge-error"}`}
          >
            {output.status}
          </span>
        )}
      </div>
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {output === null ? (
          <p className="text-base-content/50 text-sm">
            Click "Run Code" to test against all cases...
          </p>
        ) : (
          output.testCaseResults.map((tc) => (
            <div
              key={tc.testCase}
              className={`rounded-lg p-3 text-sm font-mono border ${
                tc.passed
                  ? "border-success/40 bg-success/5"
                  : "border-error/40 bg-error/5"
              }`}
            >
              <div
                className={`font-semibold mb-1 ${tc.passed ? "text-success" : "text-error"}`}
              >
                Test Case {tc.testCase}: {tc.passed ? "Passed" : "Failed"}
              </div>
              {!tc.passed && (
                <>
                  <div>Expected: {tc.expected}</div>
                  <div>Got: {tc.stdout || tc.stderr || "No output"}</div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default OutputPanel;
