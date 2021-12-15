import { useEffect, useState } from 'react';

import Card from '../Components/Card/Card';
import MealItem from './MealItem';
import classes from './AvailableMeals.module.css';
// import dataSource from '../../dataSource';


function AvailableMeals(props: any) {
  const [meals, setMeals] = useState([{name: 'spagetti2', price: 10}, {name: 'spagetti', price: 12}]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    // const fetchMeals = async () => {
    //   let responseData = [];
    //   try{
    //     responseData = await dataSource.get({ source: "meal" });
    //   }catch(e){
    //     throw new Error("Something went wrong");
    //   }
    //   let loadedMeals = [];

    //   for (const key in responseData) {
    //     loadedMeals.push({
    //       id: responseData[key].id,
    //       long_description: responseData[key].long_description,
    //       name: responseData[key].name,
    //       description: responseData[key].description,
    //       price: responseData[key].price,
    //     });
    //   }

    //   setMeals(loadedMeals);
    //   setIsLoading(false);
    // };

    // fetchMeals().catch(error => {
    //   setIsLoading(false);
    //   setHttpError(error.message)
    // });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem  {...meal}/>
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
