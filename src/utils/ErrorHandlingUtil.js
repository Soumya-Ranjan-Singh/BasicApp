// Custom error class
class CustomError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'CustomError';
    this.field = field;
  }
}

// Handle errors and throw custom error
export { CustomError };