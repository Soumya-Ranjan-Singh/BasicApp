// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react-native';
// import LoginForm from '../src/screens/LoginForm';
// import axios from 'axios';
// import { createNavigationContainerRef } from '@react-navigation/native';

// jest.mock('axios');

// describe('LoginForm', () => {
//   let navigationRef;
//   let navigation;

//   beforeEach(() => {
//     axios.get.mockReset();
//     axios.get.mockResolvedValue({
//       data: {
//         users: [
//           { email: 'atuny0@sohu.com', password: '9uQFF1Lh' },
//           { email: 'user2@example.com', password: 'password2' },
//         ],
//       },
//     });

//     navigationRef = createNavigationContainerRef();
//     navigation = {
//       addListener: jest.fn(),
//       navigate: jest.fn(),
//     };
//   });

//   test('getUsers function is called on screen focus', async () => {
//     render(<LoginForm navigation={navigation} />);

//     // Simulate screen focus
//     navigation.addListener.mock.calls[0][1](); // Call the second argument of the first call

//     // Wait for getUsers function to complete
//     await Promise.resolve();

//     // Assert that getUsers function was called
//     expect(axios.get).toHaveBeenCalledWith('https://dummyjson.com/users');
//   });

//   it('handleLogin - successful login', async () => {
//     const { getByPlaceholderText, getByText } = render(
//       <LoginForm navigation={navigation} />
//     );
//     // Await the useEffect hook to ensure the navigation listener is set up
//     await waitFor(() => expect(navigation.addListener).toHaveBeenCalledTimes(1));

//     // Update form inputs
//     fireEvent.changeText(getByPlaceholderText('Email'), 'atuny0@sohu.com');
//     fireEvent.changeText(getByPlaceholderText('Password'), '9uQFF1Lh');

//     // Trigger login
//     fireEvent.press(getByText('Login'));

//     // Assert navigation was called with 'Home' screen
//     await waitFor(() => expect(navigation.navigate).toHaveBeenCalledWith('Home'));
//   });

//   it('should render the login form', () => {
//     const { getByPlaceholderText, getByText } = render(<LoginForm navigation={navigation} />);

//     const emailInput = getByPlaceholderText('Email');
//     const passwordInput = getByPlaceholderText('Password');
//     const loginButton = getByText('Login');

//     expect(emailInput).toBeTruthy();
//     expect(passwordInput).toBeTruthy();
//     expect(loginButton).toBeTruthy();
//   });

//   it('should show an error message if email is empty', async () => {
//     const { getByPlaceholderText, getByText } = render(<LoginForm navigation={navigation} />);
//     const passwordInput = getByPlaceholderText('Password');
//     const loginButton = getByText('Login');

//     fireEvent.changeText(passwordInput, 'testpassword');
//     fireEvent.press(loginButton);

//     await waitFor(() => {
//       const errorMessage = getByText('Email is required');
//       expect(errorMessage).toBeTruthy();
//     });
//   });

//   it('should show an error message if email is invalid', async () => {
//     const { getByPlaceholderText, getByText } = render(<LoginForm navigation={navigation} />);
//     const emailInput = getByPlaceholderText('Email');
//     const passwordInput = getByPlaceholderText('Password');
//     const loginButton = getByText('Login');

//     fireEvent.changeText(emailInput, 'invalidemail');
//     fireEvent.changeText(passwordInput, 'testpassword');
//     fireEvent.press(loginButton);

//     await waitFor(() => {
//       const errorMessage = getByText('Invalid email format');
//       expect(errorMessage).toBeTruthy();
//     });
//   });

//   it('should show an error message if password is empty', async () => {
//     const { getByPlaceholderText, getByText } = render(<LoginForm navigation={navigation} />);
//     const emailInput = getByPlaceholderText('Email');
//     const loginButton = getByText('Login');

//     fireEvent.changeText(emailInput, 'user1@example.com');
//     fireEvent.press(loginButton);

//     await waitFor(() => {
//       const errorMessage = getByText('Password is required');
//       expect(errorMessage).toBeTruthy();
//     });
//   });

//   it('should show an error message if the user does not exist', async () => {
//     axios.get.mockResolvedValueOnce({
//       data: {
//         users: [
//           { email: 'atuny0@sohu.com', password: '9uQFF1Lh' },
//           { email: 'user2@example.com', password: 'password2' },
//         ],
//       },
//     });

//     const { getByPlaceholderText, getByText } = render(<LoginForm navigation={navigation} />);
//     await waitFor(() => expect(navigation.addListener).toHaveBeenCalledTimes(1));
//     const emailInput = getByPlaceholderText('Email');
//     const passwordInput = getByPlaceholderText('Password');
//     const loginButton = getByText('Login');

//     fireEvent.changeText(emailInput, 'nonexisting@example.com');
//     fireEvent.changeText(passwordInput, 'testpassword');
//     fireEvent.press(loginButton);

//     await waitFor(() => {
//       const errorMessage = getByText('User does not exist');
//       expect(errorMessage).toBeTruthy();
//     });
//   });

//   it('should show an error message if the email or password is incorrect', async () => {
//     const { getByPlaceholderText, getByText } = render(<LoginForm navigation={navigation} />);
//     const emailInput = getByPlaceholderText('Email');
//     const passwordInput = getByPlaceholderText('Password');
//     const loginButton = getByText('Login');

//     fireEvent.changeText(emailInput, 'atuny0@sohu.com');
//     fireEvent.changeText(passwordInput, 'incorrectpassword');
//     fireEvent.press(loginButton);

//     await waitFor(() => {
//       const errorMessage = getByText('Incorrect password');
//       expect(errorMessage).toBeTruthy();
//     });
//   });

//   it('should show an error message if failed to retrieve user data', async () => {
//     axios.get.mockRejectedValueOnce(new Error('Failed to retrieve user data'));

//     const { getByPlaceholderText, getByText } = render(
//       <LoginForm navigation={navigation} />
//     );
//     const emailInput = getByPlaceholderText('Email');
//     const passwordInput = getByPlaceholderText('Password');
//     const loginButton = getByText('Login');

//     fireEvent.changeText(emailInput, 'user1@example.com');
//     fireEvent.changeText(passwordInput, 'password1');
//     fireEvent.press(loginButton);

//     await waitFor(() => {
//       const errorMessage = getByText('Failed to retrieve user data');
//       expect(errorMessage).toBeTruthy();
//     });
//   });

//   it('should unsubscribe from navigation focus listener on unmount', () => {
//     const unsubscribe = jest.fn();
//     navigation.addListener.mockReturnValueOnce(unsubscribe);

//     const { unmount } = render(<LoginForm navigation={navigation} />);

//     unmount();

//     expect(unsubscribe).toHaveBeenCalled();
//   });

//   it('should show an error message if user data retrieval fails', async () => {
//     const navigation = { addListener: jest.fn() };
//     axios.get.mockRejectedValueOnce(new Error('Failed to retrieve user data'));
//     navigation.addListener.mockImplementationOnce((event, callback) => {
//       if (event === 'focus') {
//         callback();
//       }
//     });

//     const { getByText } = render(<LoginForm navigation={navigation} />);

//     await waitFor(() => {
//       const errorMessage = getByText('Failed to retrieve user data');
//       expect(errorMessage).toBeTruthy();
//     });
//   });

//   it('should show an error message if no users found', async () => {
//     const navigation = { addListener: jest.fn() };
//     axios.get.mockResolvedValueOnce({ data: { users: [] } });
//     navigation.addListener.mockImplementationOnce((event, callback) => {
//       if (event === 'focus') {
//         callback();
//       }
//     });

//     const { getByPlaceholderText, getByText } = render(
//       <LoginForm navigation={navigation} />
//     );

//     const emailInput = getByPlaceholderText('Email');
//     const passwordInput = getByPlaceholderText('Password');
//     const loginButton = getByText('Login');

//     fireEvent.changeText(emailInput, 'nonexisting@example.com');
//     fireEvent.changeText(passwordInput, 'testpassword');
//     fireEvent.press(loginButton);

//     await waitFor(() => {
//       const errorMessage = getByText('No users found');
//       expect(errorMessage).toBeTruthy();
//     });
//   });
// });

import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {expect} from '@jest/globals';

import LoginForm from '../src/screens/LoginForm';
import {toHaveStyle} from '@testing-library/jest-native';

expect.extend({toHaveStyle});

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
  addListener: jest.fn().mockImplementation((event, callback) => {
    if (event === 'focus') {
      callback(); // Call the callback function immediately to simulate focus event
    }
  }),
};

describe('LoginForm', () => {
  it('should have a black border for the email and password inputs', () => {
    const {getByPlaceholderText} = render(
      <LoginForm navigation={mockNavigation} />,
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    const emailInputStyle = emailInput.props.style;
    const passwordInputStyle = passwordInput.props.style;

    expect(emailInputStyle.borderColor).toBe('black');
    expect(passwordInputStyle.borderColor).toBe('black');
  });


  // it('should have specific CSS properties for the button', () => {
  //   const {getByText} = render(<LoginForm navigation={mockNavigation} />);
  //   const button = getByText('Login');

  //   expect(button).toHaveStyle({
  //     backgroundColor: 'blue',
  //     // Add other expected CSS properties here
  //   });
  // });

  test('CSS properties are applied correctly', () => {
    const {getByPlaceholderText} = render(
      <LoginForm navigation={mockNavigation} />,
    );
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    // Check CSS properties for email and password inputs
    expect(emailInput.props.style).toEqual({
      borderColor: 'black',
      borderWidth: 1,
      color: 'black',
    });

    expect(passwordInput.props.style).toEqual({
      borderColor: 'black',
      borderWidth: 1,
      color: 'black',
    });
  });

  test('Error text is displayed when there is an error', () => {
    const {getByText, getByPlaceholderText} = render(
      <LoginForm navigation={mockNavigation} />,
    );
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    fireEvent.press(loginButton);

    // Check if the error text is displayed
    const errorText = getByText('Email is required');
    expect(errorText).toBeTruthy();
    expect(errorText.props.style).toEqual({
      color: 'red',
    });
  });
});
