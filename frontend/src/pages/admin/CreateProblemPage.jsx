import { useNavigate } from "react-router";
import Navbar from "../../components/Navbar";
import ProblemForm from "../../components/admin/ProblemForm";
import { useCreateProblem } from "../../hooks/useProblems";

function CreateProblemPage() {
  const navigate = useNavigate();
  const createProblemMutation = useCreateProblem();

  const handleSubmit = (values) => {
    createProblemMutation.mutate(values, {
      onSuccess: () => navigate("/problems"),
    });
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Create a Problem</h1>
        <ProblemForm
          onSubmit={handleSubmit}
          isSubmitting={createProblemMutation.isPending}
          submitLabel="Create Problem"
        />
      </div>
    </div>
  );
}

export default CreateProblemPage;
