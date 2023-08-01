import { CustomError } from "./ErrorHandlingUtil";

// Validate if a value is null or empty
export const validateNullOrEmpty = (value, fieldName) => {
  if (value === null || value === undefined || value === '') {
    throw new CustomError(`${fieldName} is required`, fieldName);
  }
};

// Validate using regular expression
export const validateEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new CustomError('Invalid email format', 'email');
  }
};
