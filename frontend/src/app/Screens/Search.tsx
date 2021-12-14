import React, { FormEvent, useEffect, useState } from 'react';
import logo from './logo.svg';
import './Search.css';
// import { StringifyOptions } from 'node:querystring';
import { queryAllByAltText } from '@testing-library/dom';
import { IFoodItem } from '../Components/FoodItem/IFoodItem';
import FoodItem from '../Components/FoodItem/FoodItem';

function Search() {
  const [foodFound, setfoodFound] = useState<IFoodItem[]>([]);
  const [foodSearch, setfoodSearch] = useState('');

  const searchForFood = async (query: String): Promise<IFoodItem[]> => {
    const result = await fetch(`http://localhost:3000/?search=${query}`)
    return (await result.json()).results;
  };

  useEffect(() => {
    (async () => {
      const query = encodeURIComponent(foodSearch);
      const response = await searchForFood(query);
      setfoodFound(response);
    })();
  }, [foodSearch]);

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector('#searchText') as HTMLInputElement;
    setfoodSearch(input.value);
    input.value = '';
  };

  return (
    <div className="Search">
      <h1>Food Search</h1>
      <form className="searchForm" onSubmit={event => search(event)} >
        <input id="searchText" type="text" />
        <button>Search</button>
      </form>
      {foodSearch && <p>Results for {foodSearch}...</p>}
      <div className="foods-container">
        {foodFound.length &&
          foodFound.map(food =>
            (<FoodItem key={food.href} food={food}></FoodItem>))
        }
      </div>
    </div>
  );
}

export default Search;
