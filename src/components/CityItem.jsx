import React from 'react';
import { Link } from 'react-router-dom';
import { flagemojiToPNG, formatDate } from '../utils';
import styles from './CityItem.module.css';

function CityItem({ city }) {
  const { cityName, emoji, date, id } = city;

  return (
    <li>
      <Link
        to={`${id}`}
        className={styles.cityItem}
      >
        <span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
