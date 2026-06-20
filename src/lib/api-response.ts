type ApiSuccess<T = null> = {
  success: true;
  data?: T;
  message?: string;
};

type ApiError = {
  success: false;
  code: string;
  message: string;
  errors?: Record<string, string[]>;
};

export type ApiResponse<T = null> = ApiSuccess<T> | ApiError;

export function ok<T = null>(data?: T, message?: string): Response {
  return Response.json({ success: true, data, message } satisfies ApiSuccess<T>);
}

export function created<T = null>(data?: T, message?: string): Response {
  return Response.json(
    { success: true, data, message } satisfies ApiSuccess<T>,
    { status: 201 },
  );
}

export function badRequest(errors?: Record<string, string[]>): Response {
  return Response.json(
    {
      success: false,
      code: "VALIDATION_ERROR",
      message: "Please check the submitted fields.",
      errors,
    } satisfies ApiError,
    { status: 400 },
  );
}

export function tooManyRequests(): Response {
  return Response.json(
    {
      success: false,
      code: "RATE_LIMIT_EXCEEDED",
      message: "Too many requests. Please wait before trying again.",
    } satisfies ApiError,
    { status: 429 },
  );
}

export function serverError(): Response {
  return Response.json(
    {
      success: false,
      code: "SERVER_ERROR",
      message: "Something went wrong. Please try again later.",
    } satisfies ApiError,
    { status: 500 },
  );
}
