import React from 'react';
import { useCities } from '../contexts/CitiesContext';
import CountryItem from './CountryItem';
import styles from './CountryList.module.css';
import Message from './Message';
import Spinner from './Spinner';

function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message="Add your first city by clicking on a city on the map" />;

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
