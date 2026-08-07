// CodeBox - self-hosted, Judge0-compatible code execution engine
// Repo: https://github.com/hiteshchoudhary/Codebox

const CODEBOX_API =
  import.meta.env.VITE_CODEBOX_API_URL || "http://localhost:3000";
const CODEBOX_AUTH_TOKEN =
  import.meta.env.VITE_CODEBOX_AUTH_TOKEN || "dev-token";

// Judge0-style language_id values
const LANGUAGE_IDS = {
  javascript: 63, // Node 18
  python: 71, // Python 3.8
  java: 62, // OpenJDK 17
};

export async function executeCode(language, code) {
  try {
    const languageId = LANGUAGE_IDS[language];
    if (!languageId) {
      return { success: false, error: `Unsupported language: ${language}` };
    }

    const response = await fetch(`${CODEBOX_API}/submissions?wait=true`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": CODEBOX_AUTH_TOKEN,
      },
      body: JSON.stringify({ source_code: code, language_id: languageId }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();
    const stdout = data.stdout || "";
    const stderr = data.stderr || "";
    const compileOutput = data.compile_output || "";

    if (data.status && data.status.id !== 3) {
      return {
        success: false,
        output: stdout,
        error:
          stderr ||
          compileOutput ||
          data.status.description ||
          "Execution failed",
      };
    }
    if (stderr) return { success: false, output: stdout, error: stderr };

    return { success: true, output: stdout || "No output" };
  } catch (error) {
    return {
      success: false,
      error: `Failed to execute code: ${error.message}`,
    };
  }
}
