import { Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import {
  ChevronRightIcon,
  Code2Icon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";
import { useProblems, useDeleteProblem } from "../hooks/useProblems";
import { useCurrentUser } from "../hooks/useCurrentUser";

function ProblemsPage() {
  const navigate = useNavigate();
  const { data, isLoading } = useProblems();
  const { data: currentUserData } = useCurrentUser();
  const deleteProblemMutation = useDeleteProblem();

  const isAdmin = currentUserData?.user?.role === "admin";
  const problems = data?.data || [];

  const easyProblemsCount = problems.filter(
    (p) => p.difficulty === "EASY",
  ).length;
  const mediumProblemsCount = problems.filter(
    (p) => p.difficulty === "MEDIUM",
  ).length;
  const hardProblemsCount = problems.filter(
    (p) => p.difficulty === "HARD",
  ).length;

  const handleDelete = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      confirm("Archive this problem? It will be hidden from users immediately.")
    ) {
      deleteProblemMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200">
        <Navbar />
        <div className="flex justify-center py-24">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Practice Problems</h1>
            <p className="text-base-content/70">
              Sharpen your coding skills with these curated problems
            </p>
          </div>
          {isAdmin && (
            <Link to="/admin/problems/new" className="btn btn-primary gap-2">
              <PlusIcon className="size-4" /> New Problem
            </Link>
          )}
        </div>

        <div className="space-y-4">
          {problems.map((problem) => (
            <div
              key={problem._id}
              onClick={() => navigate(`/problem/${problem._id}`)}
              className="card bg-base-100 hover:scale-[1.01] transition-transform cursor-pointer"
            >
              <div className="card-body">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Code2Icon className="size-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-xl font-bold">{problem.title}</h2>
                          <span
                            className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}
                          >
                            {problem.difficulty.charAt(0) +
                              problem.difficulty.slice(1).toLowerCase()}
                          </span>
                          {problem.isSolved && (
                            <span className="badge badge-success badge-outline">
                              Solved
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-base-content/60">
                          {problem.tags?.join(", ")}
                        </p>
                      </div>
                    </div>
                    <p className="text-base-content/80 mb-3 line-clamp-2">
                      {problem.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {isAdmin && (
                      <>
                        <Link
                          to={`/admin/problems/${problem._id}/edit`}
                          onClick={(e) => e.stopPropagation()}
                          className="btn btn-ghost btn-sm"
                        >
                          <PencilIcon className="size-4" />
                        </Link>
                        <button
                          className="btn btn-ghost btn-sm text-error"
                          onClick={(e) => handleDelete(e, problem._id)}
                        >
                          <TrashIcon className="size-4" />
                        </button>
                      </>
                    )}
                    <div className="flex items-center gap-2 text-primary">
                      <span className="font-medium hidden sm:inline">
                        Solve
                      </span>
                      <ChevronRightIcon className="size-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="stats stats-vertical lg:stats-horizontal">
              <div className="stat">
                <div className="stat-title">Total Problems</div>
                <div className="stat-value text-primary">{problems.length}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Easy</div>
                <div className="stat-value text-success">
                  {easyProblemsCount}
                </div>
              </div>
              <div className="stat">
                <div className="stat-title">Medium</div>
                <div className="stat-value text-warning">
                  {mediumProblemsCount}
                </div>
              </div>
              <div className="stat">
                <div className="stat-title">Hard</div>
                <div className="stat-value text-error">{hardProblemsCount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProblemsPage;
