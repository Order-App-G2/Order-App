import React from 'react';
import { render, screen } from '@testing-library/react';
import Search from './Search';

test('renders homepage', () => {
  render(<Search />);
  const linkElement = screen.getByText('Search');
  expect(linkElement).toBeInTheDocument();
});
// test('renders search component', () => {
//    const onChange = jest.fn();
//    const onSubmit = jest.fn();

//   render(<Search onChange={onChange} onSubmit={onSubmit}/>);
//   render(<Search id="searchText"/>);
//   const divElement = screen.getByPlaceholderText("searchText");
//   expect(divElement).toHaveAttribute("id", "searchText")

// });
