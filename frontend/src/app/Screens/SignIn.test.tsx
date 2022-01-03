import React from 'react';
import { render, screen } from '@testing-library/react';
import SignIn from './SignIn';

test('renders homepage', () => {
  render(<SignIn />);
  const divElement = screen.getByDisplayValue("Enter your Username")
  const linkElement = screen.getByText('Sign In');
  expect(linkElement).toBeInTheDocument();
});