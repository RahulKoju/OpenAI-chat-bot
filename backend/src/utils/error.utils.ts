// Define an interface for the custom error object
interface CustomError extends Error {
  statusCode?: number;
}

// Create the errorHandler function with proper types
export const errorHandler = (
  statusCode: number,
  message: string
): CustomError => {
  const error: CustomError = new Error(message);
  error.statusCode = statusCode;
  return error;
};
