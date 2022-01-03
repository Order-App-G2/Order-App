import React from 'react';
import { render, screen } from '@testing-library/react';
import SignUp from "./SignUp"

test('renders homepage', () => {
  render(<SignUp />);
  const linkElement = screen.getByText('Sign Up');
  expect(linkElement).toBeInTheDocument();
});