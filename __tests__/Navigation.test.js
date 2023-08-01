import React from 'react';
import { render } from '@testing-library/react-native';
import Navigation from '../src/navigation/Navigation';
import LoginForm from '../src/screens/LoginForm';
import HomeScreen from '../src/screens/HomeScreen';


describe('Navigation', () => {
  it('renders the Login screen when navigated to', () => {
    const { getByPlaceholderText,getByText } = render(<Navigation />);
    expect(getByPlaceholderText('Email')).toBeTruthy();
    //expect(getByText('Home')).toBeFalsy();
  });

  // it('renders the Home screen when navigated to', () => {
  //   const { getByText, getByTestId } = render(<Navigation />);
  //   expect(getByTestId('login')).toBeFalsy();
  //   expect(getByText('Home')).toBeTruthy();
  // });

  // it('does not render the Login screen when not navigated to', () => {
  //   const { queryByText } = render(<Navigation />);
  //   expect(queryByText('Login')).toBeFalsy();
  //   expect(queryByText('Home')).toBeTruthy();
  // });

  // it('does not render the Home screen when not navigated to', () => {
  //   const { queryByText } = render(<Navigation />);
  //   expect(queryByText('Login')).toBeTruthy();
  //   expect(queryByText('Home')).toBeFalsy();
  // });

  // it('has the correct navigation structure', () => {
  //   const { getByTestId } = render(<Navigation />);
  //   const stackNavigator = getByTestId('stack-navigator');
  //   const loginScreen = getByTestId('screen-login');
  //   const homeScreen = getByTestId('screen-home');

  //   expect(stackNavigator).toBeTruthy();
  //   expect(loginScreen).toBeTruthy();
  //   expect(homeScreen).toBeTruthy();
  // });

  
  it('matches the snapshot', () => {
    const { toJSON } = render(<Navigation />);
    expect(toJSON()).toMatchSnapshot();
  });
});
