export const CONSTANTS = {
  ERRORS_PREFIX: "APP",
};

function formatErrorCode(input: string): string {
  return input.replace(/\s/g, "_").toUpperCase();
}

function createError(code: string, message: string) {
  return {
    code: `${CONSTANTS.ERRORS_PREFIX}_${formatErrorCode(code)}`,
    message,
  };
}

const ERRORS = {
  GENERIC: {
    INTERNAL_SERVER_ERROR: createError("INTERNAL_SERVER_ERROR", "Internal server error"),
  },
  NOT_FOUND: (entity: string, fieldName?: string, fieldValue?: string) => ({
    code: `${CONSTANTS.ERRORS_PREFIX}_${formatErrorCode(entity)}_NOT_FOUND`,
    message: `The ${entity}${fieldName && fieldValue ? ` with ${fieldName} ${fieldValue}` : ""} was not found.`,
  }),
  ALREADY_EXISTS: (entity: string, fieldName?: string, fieldValue?: string) => ({
    code: `${CONSTANTS.ERRORS_PREFIX}_${formatErrorCode(entity)}_ALREADY_EXISTS`,
    message: `A ${entity}${fieldName && fieldValue ? ` with ${fieldName} ${fieldValue}` : ""} already exists`,
  }),
  GITHUB: {
    API_ERROR: createError("GITHUB_API_ERROR", "GitHub API request failed"),
    RATE_LIMIT_EXCEEDED: createError("GITHUB_RATE_LIMIT_EXCEEDED", "GitHub API rate limit exceeded"),
    INVALID_QUERY: createError("GITHUB_INVALID_QUERY", "Invalid search query provided"),
    REPOSITORY_NOT_FOUND: (repositoryId?: string) =>
      createError(
        "GITHUB_REPOSITORY_NOT_FOUND",
        repositoryId ? `Repository '${repositoryId}' not found` : "Repository not found",
      ),
    UNAUTHORIZED: createError("GITHUB_UNAUTHORIZED", "GitHub API authentication failed"),
    FORBIDDEN: createError("GITHUB_FORBIDDEN", "GitHub API access forbidden or secondary rate limit exceeded"),
  },
};

export { ERRORS };
