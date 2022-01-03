import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from "./HomePage"

test('renders homepage', () => {
  render(<HomePage />);
  const linkElement = screen.getByText('Home');
  expect(linkElement).toBeInTheDocument();
});