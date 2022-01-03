import React from 'react';
import { render, screen } from '@testing-library/react';
import MealsSummary from './MealsSummary';

test('renders homepage', () => {
  render(<MealsSummary />);
  const linkElement = screen.getByText('Delicious Food, Delivered To You');
  expect(linkElement).toBeInTheDocument();
});