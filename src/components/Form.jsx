// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';
import { useUrlPosition } from '../hooks/useUrlPosition';
import BackButton from './BackButton';
import Button from './Button';
import styles from './Form.module.css';
import Message from './Message';
import Spinner from './Spinner';

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

const flagemojiToPNG = (flag) => {
  return (
    <img
      src={`https://flagcdn.com/24x18/${flag.toLowerCase()}.png`}
      alt="flag"
    />
  );
};

function Form() {
  const [lat, lng] = useUrlPosition();

  const [cityName, setCityName] = useState('');
  const [countryName, setCountryName] = useState('');
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [emoji, setEmoji] = useState(null);
  const [geocodingEror, setGeocodingEror] = useState('');

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        setGeocodingEror('');
        setIsLoadingGeocoding(true);
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryCode) throw new Error("That doesn't seem to be a city. Click somewhere else ");
        setCityName(data.principalSubdivision || data.locality || '');
        setCountryName(data.countryName);
        setEmoji(flagemojiToPNG(data.countryCode));
      } catch (err) {
        setGeocodingEror(err.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    };

    fetchCityData();
  }, [lat, lng]);

  if (isLoadingGeocoding) return <Spinner />;

  if (geocodingEror) return <Message message={geocodingEror} />;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
