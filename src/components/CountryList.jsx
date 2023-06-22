import React from 'react';
import CountryItem from './CountryItem';
import styles from './CountryList.module.css';
import Message from './Message';
import Spinner from './Spinner';

function CountryList({ cities, isLoading }) {
  console.log(cities);
  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message="Add your first city by clicking on a city on the map" />;

  // const countries = cities.reduce((arr, city) => {
  //   if (!arr.map((el) => el.country).includes(city.country))
  //     return [...arr, { country: city.country, emoji: city.emoji }];
  //   else return arr;
  // }, []);

  const countries = cities.reduce((acc, { country, emoji }) => {
    if (!acc.some((item) => item.country === country)) {
      return [...acc, { country, emoji }];
    }
    return acc;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country, index) => (
        <CountryItem
          country={country}
          key={index}
        />
      ))}
    </ul>
  );
}

export default CountryList;
