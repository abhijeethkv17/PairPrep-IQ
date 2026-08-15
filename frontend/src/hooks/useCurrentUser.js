import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/users";

export const useCurrentUser = (options = {}) => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: userApi.getCurrentUser,
    staleTime: 5 * 60 * 1000,
    // the DB user record is created asynchronously by an Inngest webhook right
    // after Clerk sign-up, so a brand-new user can briefly 404 here — retry
    // longer specifically for that case instead of giving up after the default
    // 3 attempts (~7s), so we don't bail out while the webhook is still catching up
    retry: (failureCount, error) => {
      if (error?.response?.status === 404) return failureCount < 8;
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * (attemptIndex + 1), 3000),
    ...options,
  });
};
