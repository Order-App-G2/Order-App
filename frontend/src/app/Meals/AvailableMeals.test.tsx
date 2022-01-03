import React from 'react';
import { render, screen } from '@testing-library/react';
import AvailableMeals from './AvailableMeals';

test('renders homepage', () => {
  render(<AvailableMeals />);
  const linkElement = screen.getByText('Available Meals');
  expect(linkElement).toBeInTheDocument();
});