import { useMutation } from "@tanstack/react-query";
import { submissionApi } from "../api/submissions";

export const useSubmitSolution = () => {
  return useMutation({
    mutationKey: ["submitSolution"],
    mutationFn: submissionApi.submit,
  });
};
