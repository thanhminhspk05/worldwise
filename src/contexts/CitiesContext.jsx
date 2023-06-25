import { createContext, useContext, useEffect, useState } from 'react';
import { flagemojiToPNG } from '../utils';

const BASE_URL = 'http://localhost:9000';

const CitiesContext = createContext();

const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        const newData = data.map((city) => ({ ...city, emoji: flagemojiToPNG(city.emoji) }));
        setCities(newData);
      } catch (err) {
        alert('There was an error loading data...');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  const getCity = async (id) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      const newData = { ...data, emoji: flagemojiToPNG(data.emoji) };
      setCurrentCity(newData);
    } catch (err) {
      alert('There was an error loading data...');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>{children}</CitiesContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error('CitiesContext was used outside of Provider');
  return context;
};

export { CitiesProvider, useCities };
