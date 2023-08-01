// // import React from 'react';
// // import {render, fireEvent, waitFor} from '@testing-library/react-native';
// // import LoginForm from '../src/screens/LoginForm';
// // import {validateNullOrEmpty} from '../src/utils/ValidationUtil';
// // import axios from 'axios';

// // jest.mock('axios', () => ({
// //     get: jest.fn(() =>
// //       Promise.resolve({
// //         data: {
// //           users: [
// //             {email: 'atuny0@sohu.com', password: '9uQFF1Lh'},
// //             {email: 'user2@example.com', password: 'password2'},
// //           ],
// //         },
// //       }),
// //     ),
// //   }));

// // describe('LoginForm', () => {
// //   afterEach(() => {
// //     jest.clearAllMocks();
// //   });

// //   it('renders without crashing', () => {
// //     render(<LoginForm />);
// //   });

// //   it('renders email input field', () => {
// //     const {getByPlaceholderText} = render(<LoginForm />);
// //     const emailInput = getByPlaceholderText('Email');
// //     expect(emailInput).toBeTruthy();
// //   });

// //   it('renders password input field', () => {
// //     const {getByPlaceholderText} = render(<LoginForm />);
// //     const passwordInput = getByPlaceholderText('Password');
// //     expect(passwordInput).toBeTruthy();
// //   });

// //   it('renders login button', () => {
// //     const {getByText} = render(<LoginForm />);
// //     const loginButton = getByText('Login');
// //     expect(loginButton).toBeTruthy();
// //   });

// //   it('does not display error message initially', () => {
// //     const {queryByText} = render(<LoginForm />);
// //     const errorMessage = queryByText('Email is required');
// //     expect(errorMessage).toBeNull();
// //   });

// //   it('should render the login form correctly', () => {
// //     const {getByPlaceholderText, getByText} = render(<LoginForm />);
// //     const emailInput = getByPlaceholderText('Email');
// //     const passwordInput = getByPlaceholderText('Password');
// //     const loginButton = getByText('Login');

// //     expect(emailInput).toBeDefined();
// //     expect(passwordInput).toBeDefined();
// //     expect(loginButton).toBeDefined();
// //   });

// //   it('should display error message when login fails due to invalid email', () => {
// //     const {getByPlaceholderText, getByText} = render(<LoginForm />);
// //     const emailInput = getByPlaceholderText('Email');
// //     const passwordInput = getByPlaceholderText('Password');
// //     const loginButton = getByText('Login');

// //     fireEvent.changeText(emailInput, 'invalid-email');
// //     fireEvent.changeText(passwordInput, 'password');
// //     fireEvent.press(loginButton);

// //     const errorMessage = getByText('Invalid email format');
// //     expect(errorMessage).toBeDefined();
// //   });

// //   it('should display error message when login fails due to empty email', () => {
// //     const {getByPlaceholderText, getByText} = render(<LoginForm />);
// //     const emailInput = getByPlaceholderText('Email');
// //     const passwordInput = getByPlaceholderText('Password');
// //     const loginButton = getByText('Login');

// //     fireEvent.changeText(emailInput, '');
// //     fireEvent.changeText(passwordInput, 'password');
// //     fireEvent.press(loginButton);

// //     const errorMessage = getByText('Email is required');
// //     expect(errorMessage).toBeDefined();
// //   });

// //   it('should display error message when login fails due to empty password', () => {
// //     const {getByPlaceholderText, getByText} = render(<LoginForm />);
// //     const emailInput = getByPlaceholderText('Email');
// //     const passwordInput = getByPlaceholderText('Password');
// //     const loginButton = getByText('Login');

// //     fireEvent.changeText(emailInput, 'test@example.com');
// //     fireEvent.changeText(passwordInput, '');
// //     fireEvent.press(loginButton);

// //     const errorMessage = getByText('Password is required');
// //     expect(errorMessage).toBeDefined();
// //   });

// //   test('renders LoginForm without errors', () => {
// //     render(<LoginForm />);
// //   });

// //   test('initial state should be empty', () => {
// //     const {getByPlaceholderText} = render(<LoginForm />);
// //     const emailInput = getByPlaceholderText('Email');
// //     const passwordInput = getByPlaceholderText('Password');
  
// //     expect(emailInput.props.value).toBe('');
// //     expect(passwordInput.props.value).toBe('');
// //   });

// //   test('updates email and password state on user input', () => {
// //     const {getByPlaceholderText} = render(<LoginForm />);
// //     const emailInput = getByPlaceholderText('Email');
// //     const passwordInput = getByPlaceholderText('Password');
  
// //     fireEvent.changeText(emailInput, 'test@example.com');
// //     fireEvent.changeText(passwordInput, 'password123');
  
// //     expect(emailInput.props.value).toBe('test@example.com');
// //     expect(passwordInput.props.value).toBe('password123');
// //   });

// //   it('should show an error message if email is empty', async () => {
// //     const {getByPlaceholderText, getByTestId, getByText} = render(<LoginForm />);
// //     const passwordInput = getByPlaceholderText('Password');
// //     const loginButton = getByText('Login');

// //     fireEvent.changeText(passwordInput, 'testpassword');
// //     fireEvent.press(loginButton);

    
// //       const errorMessage = getByText('Email is required');
// //       expect(errorMessage).toBeTruthy();
    
// //   });

// //   it('should display error message when login fails due to API error', async () => {
// //     const {getByPlaceholderText, getByText} = render(<LoginForm />);
// //     const emailInput = getByPlaceholderText('Email');
// //     const passwordInput = getByPlaceholderText('Password');
// //     const loginButton = getByText('Login');

// //     fireEvent.changeText(emailInput, 'test@example.com');
// //     fireEvent.changeText(passwordInput, 'password');
    
// //     axios.get.mockRejectedValue(new Error('API error'));
// //     fireEvent.press(loginButton);
    
// //     const errorMessage = getByText('Authorization failed due to some error');
// //     expect(errorMessage).toBeDefined();
    
// //   });

// //   it('should display error message when user does not exist', async () => {
// //     const {getByPlaceholderText, getByText} = render(<LoginForm />);
// //     const emailInput = getByPlaceholderText('Email');
// //     const passwordInput = getByPlaceholderText('Password');
// //     const loginButton = getByText('Login');

// //     fireEvent.changeText(emailInput, 'nonexistent@example.com');
// //     fireEvent.changeText(passwordInput, 'password');

// //     axios.get.mockResolvedValue({
// //       data: {users: [{email: 'test@example.com', password: 'password'}]},
// //     });

// //     fireEvent.press(loginButton);

// //     await waitFor(() => {
// //       const errorMessage = getByText('User does not exist');
// //       expect(errorMessage).toBeDefined();
// //     });
// //   });

// //   it('should navigate to the home screen on successful login', async () => {
// //     const navigationMock = {
// //       navigate: jest.fn(),
// //     };

// //     const {getByPlaceholderText, getByText} = render(
// //       <LoginForm navigation={navigationMock} />,
// //     );
// //     const emailInput = getByPlaceholderText('Email');
// //     const passwordInput = getByPlaceholderText('Password');
// //     const loginButton = getByText('Login');

// //     fireEvent.changeText(emailInput, 'atuny0@sohu.com');
// //     fireEvent.changeText(passwordInput, '9uQFF1Lh');

// //     axios.get.mockResolvedValue({
// //       data: {users: [{email: 'atuny0@sohu.com', password: '9uQFF1Lh'}]},
// //     });

// //     fireEvent.press(loginButton);

// //     await waitFor(() => {
// //       expect(navigationMock.navigate).toHaveBeenCalledWith('Home');
// //     });
// //   });

// //   it('should display error message when email or password is incorrect', async () => {
// //     const {getByPlaceholderText, getByText, debug} = render(<LoginForm />);
// //     const emailInput = getByPlaceholderText('Email');
// //     const passwordInput = getByPlaceholderText('Password');
// //     const loginButton = getByText('Login');

// //     fireEvent.changeText(emailInput, 'test@example.com');
// //     fireEvent.changeText(passwordInput, 'incorrect-password');

// //     axios.get.mockResolvedValue({
// //       data: {users: [{email: 'atuny0@sohu.com', password: '9uQFF1Lh'}]},
// //     });

// //     fireEvent.press(loginButton);

// //     await waitFor(() => {
// //       debug(); // Print the component hierarchy for inspection
// //       const errorMessage = getByText('Incorrect email or password');
// //       expect(errorMessage).toBeDefined();
// //     });
// //   });
// // });

// import React from 'react';
// import { render, fireEvent } from '@testing-library/react-native';
// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
// import LoginForm from '../src/screens/LoginForm';

// // Create a mock adapter for axios
// const mock = new MockAdapter(axios);

// describe('LoginForm', () => {
//   beforeEach(() => {
//     // Reset the mock adapter before each test
//     mock.reset();
//   });

//   test('fetches users on component focus', async () => {
//     // Mock the API response
//     const mockData = {
//       users: [
//         { email: 'user1@example.com', password: 'password1' },
//         { email: 'user2@example.com', password: 'password2' },
//       ],
//     };
//     mock.onGet('https://dummyjson.com/users').reply(200, mockData);

//     const { findByText } = render(<LoginForm navigation={{ addListener: jest.fn() }} />);

//     // Wait for the component to fetch and display the user data
//     const user1 = await findByText('user1@example.com');
//     const user2 = await findByText('user2@example.com');

//     expect(user1).toBeTruthy();
//     expect(user2).toBeTruthy();
//   });

//   test('handles error when fetching users', async () => {
//     // Mock an error response
//     mock.onGet('https://dummyjson.com/users').reply(500);

//     const { findByText } = render(<LoginForm navigation={{ addListener: jest.fn() }} />);

//     // Wait for the error message to be displayed
//     const errorMessage = await findByText('Failed to retrieve user data');

//     expect(errorMessage).toBeTruthy();
//   });

//   test('handles login with valid credentials', async () => {
//     // Mock the API response
//     const mockData = {
//       users: [
//         { email: 'user1@example.com', password: 'password1' },
//         { email: 'user2@example.com', password: 'password2' },
//       ],
//     };
//     mock.onGet('https://dummyjson.com/users').reply(200, mockData);

//     const { getByPlaceholderText, getByTitle, queryByText } = render(
//       <LoginForm navigation={{ navigate: jest.fn() }} />
//     );

//     // Enter valid email and password
//     fireEvent.changeText(getByPlaceholderText('Email'), 'user1@example.com');
//     fireEvent.changeText(getByPlaceholderText('Password'), 'password1');

//     // Trigger the login button
//     fireEvent.press(getByTitle('Login'));

//     // Check that the navigation was called with the expected route name
//     expect(navigation.navigate).toHaveBeenCalledWith('Home');

//     // Check that no error message is displayed
//     expect(queryByText('No users found')).toBeNull();
//     expect(queryByText('Incorrect password')).toBeNull();
//     expect(queryByText('User does not exist')).toBeNull();
//   });

//   // Add more test cases for handling different login scenarios...
// });






import React from 'react';
import renderer from 'react-test-renderer';
import LoginForm from '../src/screens/LoginForm';
import axios from 'axios';

// Mock axios and navigation
jest.mock('axios');
const mockNavigation = {
  addListener: jest.fn(),
  navigate: jest.fn(),
};

describe('LoginForm', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<LoginForm navigation={mockNavigation} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
