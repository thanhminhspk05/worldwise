import React from 'react';
import { Link } from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext';
import { formatDate } from '../utils';
import styles from './CityItem.module.css';

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const {
    cityName,
    emoji,
    date,
    id,
    position: { lat, lng },
  } = city;

  const handleClick = async (e) => {
    e.preventDefault();
    const confirm = window.confirm('Are you sure to delete this city?');
    if (confirm) deleteCity(id);
  };

  return (
    <li>
      <Link
        to={`${id}?lat=${lat}&lng=${lng}`}
        className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active'] : ''}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button
          className={styles.deleteBtn}
          onClick={handleClick}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
