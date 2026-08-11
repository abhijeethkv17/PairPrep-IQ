import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { problemApi } from "../api/problems";

export const useProblems = () => {
  return useQuery({ queryKey: ["problems"], queryFn: problemApi.getProblems });
};

export const useProblem = (id) => {
  return useQuery({
    queryKey: ["problem", id],
    queryFn: () => problemApi.getProblemById(id),
    enabled: !!id,
  });
};

export const useCreateProblem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createProblem"],
    mutationFn: problemApi.createProblem,
    onSuccess: () => {
      toast.success("Problem created successfully!");
      queryClient.invalidateQueries({ queryKey: ["problems"] });
    },
    onError: (error) =>
      toast.error(error.response?.data?.message || "Failed to create problem"),
  });
};

export const useUpdateProblem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateProblem"],
    mutationFn: problemApi.updateProblem,
    onSuccess: () => {
      toast.success("Problem updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["problems"] });
    },
    onError: (error) =>
      toast.error(error.response?.data?.message || "Failed to update problem"),
  });
};

export const useDeleteProblem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteProblem"],
    mutationFn: problemApi.deleteProblem,
    onSuccess: () => {
      toast.success("Problem deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["problems"] });
    },
    onError: (error) =>
      toast.error(error.response?.data?.message || "Failed to delete problem"),
  });
};
