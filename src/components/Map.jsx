import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvent } from 'react-leaflet';
import { useCities } from '../contexts/CitiesContext';

function Map() {
  const navigate = useNavigate();
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([11, 107]);
  // const [myLocation, setMyLocation] = useState([0, 0]);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('lat')) {
      const mapLat = searchParams.get('lat');
      const mapLng = searchParams.get('lng');
      setMapPosition([mapLat, mapLng]);
    }
  }, [searchParams]);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     setMyLocation([position.coords.latitude, position.coords.longitude]);
  //   });
  // }, []);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              {city.emoji} {city.cityName}
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&${e.latlng.lng}`),
  });
}

export default Map;
