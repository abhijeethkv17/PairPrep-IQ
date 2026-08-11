import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../components/Navbar";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ProblemDescription from "../components/ProblemDescription";
import OutputPanel from "../components/OutputPanel";
import CodeEditorPanel from "../components/CodeEditorPanel";

import { useProblem } from "../hooks/useProblems";
import { useSubmitSolution } from "../hooks/useSubmissions";

import toast from "react-hot-toast";
import confetti from "canvas-confetti";

function ProblemPage() {
  const { id } = useParams();
  const { data, isLoading } = useProblem(id);
  const submitMutation = useSubmitSolution();

  const problem = data?.data;

  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (problem?.codeSnippets?.[selectedLanguage.toUpperCase()]) {
      setCode(problem.codeSnippets[selectedLanguage.toUpperCase()]);
      setOutput(null);
    }
  }, [problem, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setCode(problem.codeSnippets[newLang.toUpperCase()]);
    setOutput(null);
  };

  const triggerConfetti = () => {
    confetti({ particleCount: 80, spread: 250, origin: { x: 0.2, y: 0.6 } });
    confetti({ particleCount: 80, spread: 250, origin: { x: 0.8, y: 0.6 } });
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    try {
      const result = await submitMutation.mutateAsync({
        problemId: id,
        language: selectedLanguage.toUpperCase(),
        sourceCode: code,
      });

      setOutput(result.submission);

      if (result.submission.status === "Accepted") {
        triggerConfetti();
        toast.success("All test cases passed! Great job!");
      } else {
        toast.error("Some test cases failed. Check the output panel.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Code execution failed!");
    } finally {
      setIsRunning(false);
    }
  };

  if (isLoading || !problem) {
    return (
      <div className="h-screen flex items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="h-screen bg-base-100 flex flex-col">
      <Navbar />
      <div className="flex-1">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={40} minSize={30}>
            <ProblemDescription
              problem={problem}
              selectedLanguage={selectedLanguage}
            />
          </Panel>
          <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />
          <Panel defaultSize={60} minSize={30}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={70} minSize={30}>
                <CodeEditorPanel
                  selectedLanguage={selectedLanguage}
                  code={code}
                  isRunning={isRunning}
                  onLanguageChange={handleLanguageChange}
                  onCodeChange={setCode}
                  onRunCode={handleRunCode}
                />
              </Panel>
              <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />
              <Panel defaultSize={30} minSize={30}>
                <OutputPanel output={output} />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}
export default ProblemPage;
