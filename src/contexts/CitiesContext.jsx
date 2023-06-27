import { createContext, useContext, useEffect, useReducer } from 'react';
import { flagemojiToPNG } from '../utils';

const BASE_URL = 'http://localhost:9000';

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: !state.isLoading };
    case 'setCities':
      return { ...state, cities: action.payload };
    case 'setCurrentCity':
      return { ...state, currentCity: action.payload };
    case 'deleteCity':
      return { ...state, cities: state.cities.filter((city) => city.id !== action.payload) };
    default:
      return state;
  }
};

const CitiesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, currentCity } = state;

  useEffect(() => {
    const fetchCities = async () => {
      try {
        dispatch({ type: 'loading' });
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        const newData = data.map((city) => ({ ...city, emoji: flagemojiToPNG(city.emoji) }));
        dispatch({ type: 'setCities', payload: newData });
      } catch (err) {
        alert('There was an error loading data...');
      } finally {
        dispatch({ type: 'loading' });
      }
    };

    fetchCities();
  }, []);

  const getCity = async (id) => {
    try {
      dispatch({ type: 'loading' });
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      const newData = { ...data, emoji: flagemojiToPNG(data.emoji) };
      dispatch({ type: 'setCities', payload: newData });
    } catch (err) {
      alert('There was an error loading data...');
    } finally {
      dispatch({ type: 'loading' });
    }
  };

  const createCity = async (newCity) => {
    try {
      dispatch({ type: 'loading' });
      await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const emojiData = { ...newCity, emoji: flagemojiToPNG(newCity.emoji) };
      dispatch({ type: 'setCurrentCity', payload: emojiData });
    } catch (err) {
      alert('There was an error loading data...');
    } finally {
      dispatch({ type: 'loading' });
    }
  };

  const deleteCity = async (id) => {
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'deleteCity', payload: id });
    } catch (err) {
      alert('There was an error loading data...');
    }
  };

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity, createCity, deleteCity }}>
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error('CitiesContext was used outside of Provider');
  return context;
};

export { CitiesProvider, useCities };
