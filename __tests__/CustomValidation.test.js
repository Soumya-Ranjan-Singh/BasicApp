import { validateEmail, validateNullOrEmpty } from '../src/utils/ValidationUtil'; 
import { CustomError } from '../src/utils/ErrorHandlingUtil';

describe('validateNullOrEmpty', () => {
  it('should throw a CustomError if the value is null', () => {
    const value = null;
    const fieldName = 'Field';

    expect(() => {
      validateNullOrEmpty(value, fieldName);
    }).toThrow(CustomError);
    expect(() => {
      validateNullOrEmpty(value, fieldName);
    }).toThrow(`${fieldName} is required`);
  });

  it('should throw a CustomError if the value is empty', () => {
    const value = '';
    const fieldName = 'Field';

    expect(() => {
      validateNullOrEmpty(value, fieldName);
    }).toThrow(CustomError);
    expect(() => {
      validateNullOrEmpty(value, fieldName);
    }).toThrow(`${fieldName} is required`);
  });

  it('should not throw an error if the value is not null or empty', () => {
    const value = 'Some value';
    const fieldName = 'Field';

    expect(() => {
      validateNullOrEmpty(value, fieldName);
    }).not.toThrow();
  });
});

describe('validateEmail', () => {
  it('should throw a CustomError if the email is invalid', () => {
    const email = 'invalid-email';
    
    expect(() => {
      validateEmail(email);
    }).toThrow(CustomError);
    expect(() => {
      validateEmail(email);
    }).toThrow('Invalid email format');
  });

  it('should not throw an error if the email is valid', () => {
    const email = 'test@example.com';

    expect(() => {
      validateEmail(email);
    }).not.toThrow();
  });
});
