import React from 'react';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import axios from 'axios';

import LoginForm from '../src/screens/LoginForm';

// Mock axios
jest.mock('axios');

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
  beforeEach(() => {
    axios.get.mockReset();
    axios.get.mockResolvedValue({
      data: {
        users: [
          {email: 'atuny0@sohu.com', password: '9uQFF1Lh'},
          {email: 'user2@example.com', password: 'password2'},
        ],
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch user data on component focus', async () => {
    render(<LoginForm navigation={mockNavigation} />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('https://dummyjson.com/users');
    });
  });

  it('should navigate to Home screen on successful login', async () => {
    const {getByPlaceholderText, getByText} = render(
      <LoginForm navigation={mockNavigation} />,
    );
    await waitFor(() =>
      expect(mockNavigation.addListener).toHaveBeenCalledTimes(1),
    );
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('https://dummyjson.com/users');
    });

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    fireEvent.changeText(emailInput, 'atuny0@sohu.com');
    fireEvent.changeText(passwordInput, '9uQFF1Lh');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Home');
    });
  });

  it('should show an error message if incorrect password', async () => {
    const {getByPlaceholderText, getByText} = render(
      <LoginForm navigation={mockNavigation} />,
    );
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('https://dummyjson.com/users');
    });

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    fireEvent.changeText(emailInput, 'atuny0@sohu.com');
    fireEvent.changeText(passwordInput, 'wrongpassword');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(getByText('Incorrect password')).toBeTruthy();
    });
  });

  it('should show an error message if user does not exist', async () => {
    const {getByPlaceholderText, getByText} = render(
      <LoginForm navigation={mockNavigation} />,
    );
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('https://dummyjson.com/users');
    });

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    fireEvent.changeText(emailInput, 'nonexisting@example.com');
    fireEvent.changeText(passwordInput, 'nopassword');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(getByText('User does not exist')).toBeTruthy();
    });
  });

  it('getUsers function is called on screen focus', async () => {
    render(<LoginForm navigation={mockNavigation} />);

    // Simulate screen focus
    await act(async () => {
      mockNavigation.addListener.mock.calls[0][1](); // Call the second argument of the first call
    }); // Call the second argument of the first call

    // Wait for getUsers function to complete
    await Promise.resolve();

    // Assert that getUsers function was called
    expect(axios.get).toHaveBeenCalledWith('https://dummyjson.com/users');
  });

  it('handleLogin - successful login', async () => {
    const {getByPlaceholderText, getByText} = render(
      <LoginForm navigation={mockNavigation} />,
    );
    // Await the useEffect hook to ensure the navigation listener is set up
    await waitFor(() =>
      expect(mockNavigation.addListener).toHaveBeenCalledTimes(1),
    );

    // Update form inputs
    fireEvent.changeText(getByPlaceholderText('Email'), 'user2@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password2');

    // Trigger login
    fireEvent.press(getByText('Login'));

    // Assert navigation was called with 'Home' screen
    await waitFor(() =>
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Home'),
    );
  });

  it('should render the login form', async () => {
    const {getByPlaceholderText, getByText} = render(
      <LoginForm navigation={mockNavigation} />,
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(loginButton).toBeTruthy();

    // // Wait for any pending promises or async updates to complete
    // await act(async () => {
    //   await waitFor(() =>
    //     expect(axios.get).toHaveBeenCalledWith('https://dummyjson.com/users'),
    //   );
    // });
  });

  it('should show an error message if email is empty', async () => {
    const {getByPlaceholderText, getByText} = render(
      <LoginForm navigation={mockNavigation} />,
    );
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    fireEvent.changeText(passwordInput, 'testpassword');
    fireEvent.press(loginButton);

    await waitFor(() => {
      const errorMessage = getByText('Email is required');
      expect(errorMessage).toBeTruthy();
    });
  });

  it('should show an error message if email is invalid', async () => {
    const {getByPlaceholderText, getByText} = render(
      <LoginForm navigation={mockNavigation} />,
    );
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    fireEvent.changeText(emailInput, 'invalidemail');
    fireEvent.changeText(passwordInput, 'testpassword');
    fireEvent.press(loginButton);

    await waitFor(() => {
      const errorMessage = getByText('Invalid email format');
      expect(errorMessage).toBeTruthy();
    });
  });

  it('should show an error message if password is empty', async () => {
    const {getByPlaceholderText, getByText} = render(
      <LoginForm navigation={mockNavigation} />,
    );
    const emailInput = getByPlaceholderText('Email');
    const loginButton = getByText('Login');

    fireEvent.changeText(emailInput, 'user1@example.com');
    fireEvent.press(loginButton);

    await waitFor(() => {
      const errorMessage = getByText('Password is required');
      expect(errorMessage).toBeTruthy();
    });
  });

  it('should show an error message if the user does not exist', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        users: [
          {email: 'atuny0@sohu.com', password: '9uQFF1Lh'},
          {email: 'user2@example.com', password: 'password2'},
        ],
      },
    });

    const {getByPlaceholderText, getByText} = render(
      <LoginForm navigation={mockNavigation} />,
    );
    await waitFor(() =>
      expect(mockNavigation.addListener).toHaveBeenCalledTimes(1),
    );
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    fireEvent.changeText(emailInput, 'nonexisting@example.com');
    fireEvent.changeText(passwordInput, 'testpassword');
    fireEvent.press(loginButton);

    await waitFor(() => {
      const errorMessage = getByText('User does not exist');
      expect(errorMessage).toBeTruthy();
    });
  });

  it('should show an error message if password is incorrect', async () => {
    const {getByPlaceholderText, getByText} = render(
      <LoginForm navigation={mockNavigation} />,
    );
    await waitFor(() =>
      expect(mockNavigation.addListener).toHaveBeenCalledTimes(1),
    );
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    fireEvent.changeText(emailInput, 'atuny0@sohu.com');
    fireEvent.changeText(passwordInput, 'incorrectpassword');
    fireEvent.press(loginButton);

    await waitFor(() => {
      const errorMessage = getByText('Incorrect password');
      expect(errorMessage).toBeTruthy();
    });
  });

  it('should show an error message if failed to retrieve user data', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to retrieve user data'));

    const {getByPlaceholderText, getByText} = render(
      <LoginForm navigation={mockNavigation} />,
    );
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    fireEvent.changeText(emailInput, 'user1@example.com');
    fireEvent.changeText(passwordInput, 'password1');
    fireEvent.press(loginButton);

    await waitFor(() => {
      const errorMessage = getByText('Failed to retrieve user data');
      expect(errorMessage).toBeTruthy();
    });
  });

  it('should unsubscribe from navigation focus listener on unmount', () => {
    const unsubscribe = jest.fn();
    mockNavigation.addListener.mockReturnValueOnce(unsubscribe);

    const {unmount} = render(<LoginForm navigation={mockNavigation} />);

    unmount();

    expect(unsubscribe).toHaveBeenCalled();
  });

  it('should show an error message if user data retrieval fails', async () => {
    const navigation = {addListener: jest.fn()};
    axios.get.mockRejectedValueOnce(new Error('Failed to retrieve user data'));
    navigation.addListener.mockImplementationOnce((event, callback) => {
      if (event === 'focus') {
        callback();
      }
    });

    const {getByText} = render(<LoginForm navigation={navigation} />);

    await waitFor(() => {
      const errorMessage = getByText('Failed to retrieve user data');
      expect(errorMessage).toBeTruthy();
    });
  });

  it('should show an error message if no users found', async () => {
    axios.get.mockResolvedValueOnce({data: {users: []}});
    mockNavigation.addListener.mockImplementationOnce((event, callback) => {
      if (event === 'focus') {
        callback();
      }
    });

    const {getByPlaceholderText, getByText} = render(
      <LoginForm navigation={mockNavigation} />,
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    fireEvent.changeText(emailInput, 'nonexisting@example.com');
    fireEvent.changeText(passwordInput, 'testpassword');
    fireEvent.press(loginButton);

    await waitFor(() => {
      const errorMessage = getByText('No users found');
      expect(errorMessage).toBeTruthy();
    });
  });

  it('renders without crashing', async () => {
    render(<LoginForm navigation={mockNavigation} />);

    // Wait for any pending promises or async updates to complete
    await act(async () => {
      await waitFor(() =>
        expect(axios.get).toHaveBeenCalledWith('https://dummyjson.com/users'),
      );
    });
  });

  it('renders email input field', () => {
    const {getByPlaceholderText} = render(
      <LoginForm navigation={mockNavigation} />,
    );
    const emailInput = getByPlaceholderText('Email');
    expect(emailInput).toBeTruthy();
  });

  it('renders password input field', () => {
    const {getByPlaceholderText} = render(
      <LoginForm navigation={mockNavigation} />,
    );
    const passwordInput = getByPlaceholderText('Password');
    expect(passwordInput).toBeTruthy();
  });

  it('renders login button', () => {
    const {getByText} = render(<LoginForm navigation={mockNavigation} />);
    const loginButton = getByText('Login');
    expect(loginButton).toBeTruthy();
  });

  it('does not display error message initially', () => {
    const {queryByText} = render(<LoginForm navigation={mockNavigation} />);
    const errorMessage = queryByText('Email is required');
    expect(errorMessage).toBeNull();
    //Check that no error message is displayed
    expect(queryByText('No users found')).toBeNull();
    expect(queryByText('Incorrect password')).toBeNull();
    expect(queryByText('User does not exist')).toBeNull();
  });

  it('initial state should be empty', () => {
    const {getByPlaceholderText} = render(
      <LoginForm navigation={mockNavigation} />,
    );
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    expect(emailInput.props.value).toBe('');
    expect(passwordInput.props.value).toBe('');
  });

  test('updates email and password state on user input', () => {
    const {getByPlaceholderText} = render(
      <LoginForm navigation={mockNavigation} />,
    );
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
  });
});
