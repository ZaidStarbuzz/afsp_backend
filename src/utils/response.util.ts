export const successResponse = (
  statusCode: number,
  data: any,
  message: string,
) => ({
  success: true,
  statusCode,
  data,
  message,
});

export const errorResponse = (
  statusCode: number,
  error: string,
  message: string,
) => ({
  success: false,
  statusCode,
  data: null,
  message,
  error,
});
