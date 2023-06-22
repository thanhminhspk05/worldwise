import React from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';

function Map() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  return (
    <div
      className={styles.mapContainer}
      onClick={() => navigate('form')}
    >
      <h1>Citi ID {id}</h1>
      <p>
        Position: {lat}, {lng}
      </p>
      <button onClick={() => setSearchParams({ lat: 23, lng: 50 })}>Change position</button>
    </div>
  );
}

export default Map;
