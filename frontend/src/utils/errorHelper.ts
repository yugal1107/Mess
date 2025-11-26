// src/utils/errorHelper.ts

/**
 * Extracts a user-friendly error message from an API error response.
 * Handles the various formats the backend might return errors in.
 */
export const getErrorMessage = (
  err: any,
  defaultMessage = "An error occurred"
): string => {
  // Try different paths where error message might be
  return (
    err.response?.data?.error?.error ||
    err.response?.data?.error?.message ||
    err.response?.data?.data?.message ||
    err.response?.data?.message ||
    err.message ||
    defaultMessage
  );
};
