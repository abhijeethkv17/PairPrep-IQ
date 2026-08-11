import { useNavigate, useParams } from "react-router";
import Navbar from "../../components/Navbar";
import ProblemForm from "../../components/admin/ProblemForm";
import { useProblem, useUpdateProblem } from "../../hooks/useProblems";

function EditProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useProblem(id);
  const updateProblemMutation = useUpdateProblem();

  if (isLoading || !data) return null;

  const handleSubmit = (values) => {
    updateProblemMutation.mutate(
      { id, data: values },
      { onSuccess: () => navigate("/problems") },
    );
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Edit Problem</h1>
        <ProblemForm
          defaultValues={data.data}
          onSubmit={handleSubmit}
          isSubmitting={updateProblemMutation.isPending}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
}

export default EditProblemPage;
