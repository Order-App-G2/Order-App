import React from 'react';
import { render, screen } from '@testing-library/react';
import CardPage from './CardPage';

test('renders homepage', () => {
  render(<CardPage />);
  const linkElement = screen.getByText('Cards');
  expect(linkElement).toBeInTheDocument();
});