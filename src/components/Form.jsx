// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext';
import { useUrlPosition } from '../hooks/useUrlPosition';
import BackButton from './BackButton';
import Button from './Button';
import styles from './Form.module.css';
import Message from './Message';
import Spinner from './Spinner';

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form() {
  const [lat, lng] = useUrlPosition();
  const { createCity, getCity } = useCities();
  const [cityName, setCityName] = useState('');
  const [countryName, setCountryName] = useState('');
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [emoji, setEmoji] = useState(null);
  const [geocodingEror, setGeocodingEror] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!lat && !lng) return;

    const fetchCityData = async () => {
      try {
        setGeocodingEror('');
        setIsLoadingGeocoding(true);
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryCode) throw new Error("That doesn't seem to be a city. Click somewhere else ");
        setCityName(data.principalSubdivision || data.locality || '');
        setCountryName(data.countryName);
        setEmoji(data.countryCode);
      } catch (err) {
        setGeocodingEror(err.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    };

    fetchCityData();
  }, [lat, lng]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country: countryName,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate('/app/cities');
    await getCity();
  };

  if (isLoadingGeocoding) return <Spinner />;

  if (!lat && !lng) return <Message message="Start by clicking on the map" />;

  if (geocodingEror) return <Message message={geocodingEror} />;

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
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

        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
          // showTimeSelect
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
