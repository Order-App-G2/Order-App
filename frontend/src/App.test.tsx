import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders homepage', () => {
  render(<App />);
  const linkElement = screen.getByText('Delicious Food, Delivered To You');
  expect(linkElement).toBeInTheDocument();
});
