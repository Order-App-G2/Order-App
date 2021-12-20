import React, { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import logo from './logo.svg';
import './Search.css';
// import { StringifyOptions } from 'node:querystring';
import { queryAllByAltText } from '@testing-library/dom';
import { IFoodItem } from '../Components/FoodItem/IFoodItem';
import FoodItem from '../Components/FoodItem/FoodItem';

export interface SearchProps {
  onChange?: (query: string) => void;
  onSubmit?: (query: string) => void;
}
function Search(props: SearchProps) {
  function handleChange(e: any) {
    console.log(e.target.value);
  }

  return (
    <div className="Search">
      <h1>Food Search</h1>
      {/* <form className="searchForm"> */}
        <input id="searchText" type="text" onChange={handleChange}/>
        {/* <button>Search</button> */}
      {/* </form> */}
      {/* {foodSearch && <p>Results for {foodSearch}...</p>}
      <div className="foods-container">
        {foodFound.length &&
          foodFound.map(food =>
            (<FoodItem key={food.href} food={food}></FoodItem>))
        }
      </div> */}
    </div>
  );
}

export default Search;
