export const STATUS = {
  SUCCESS: "SUCCESS",
  ERROR: "FAILURE",
  ACCEPTED: "ACCEPTED",
  NOT_ACCEPTED: "NOT_ACCEPTED",
  EXCEPTION: "EXCEPTION",
  NOT_FOUND: "NOT FOUND",
} as const;

// Create a type from the STATUS values
export type StatusType = (typeof STATUS)[keyof typeof STATUS];

export const CODE = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NON_AUTHORITIVE_INFORMATION: 203,
  PARTIAL_CONTENT: 206,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  RECORD_NOT_FOUND: 404,
  NOT_ACCEPTED: 406,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Create a type from the CODE values
export type CodeType = (typeof CODE)[keyof typeof CODE];

export const PASSWORD = {
  MESSAGE_FORMAT:
    "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
  REGEX:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
} as const;
