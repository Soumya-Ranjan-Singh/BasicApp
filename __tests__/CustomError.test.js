import { CustomError } from "../src/utils/ErrorHandlingUtil"; 

describe('CustomError', () => {
  it('should create a CustomError object with the provided message and field', () => {
    const errorMessage = 'Custom error message';
    const errorField = 'email';
    const error = new CustomError(errorMessage, errorField);

    expect(error.message).toBe(errorMessage);
    expect(error.field).toBe(errorField);
  });
});
