import axiosInstance from "../lib/axios";

export const submissionApi = {
  submit: async ({ problemId, language, sourceCode }) => {
    const response = await axiosInstance.post(`/problems/${problemId}/submit`, {
      language,
      sourceCode,
    });
    return response.data;
  },
};
