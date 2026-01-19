import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/citiescontext";
import { useGeolocation } from "../hooks/useGeolocate";
import Button from "./Button";
import useURLPos from "../hooks/useURLPos";

function Map() {
  const { cities } = useCities();
  const [mapPos, setMapPos] = useState([40, 0]);
  const [lat, lng] = useURLPos();
  const {
    isLoading: GeoLocationLoading,
    lat: GeoLat,
    lng: GeoLong,
    getPosition,
  } = useGeolocation();

  useEffect(
    function () {
      if (lat && lng) setMapPos([lat, lng]);
    },
    [lat, lng]
  );

  useEffect(
    function () {
      if (GeoLat && GeoLong) setMapPos([GeoLat, GeoLong]);
    },
    [GeoLat, GeoLong]
  );

  return (
    <div className={styles.mapContainer}>
      {!GeoLat && !GeoLong && (
        <Button type="position" onClick={getPosition}>
          {GeoLocationLoading ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPos}
        zoom={7}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          return (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                <span>{city.emoji}</span> <br /> <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPos} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

// Custom Component
// eslint-disable-next-line react/prop-types
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

/* This is no react syntax, its just the way it is from the leaflet library
   This function is to open form whenever there is a click on the map.
  Programmatic Naigation - Move to a new URL without having the user to click on any link.
  useNavigate provided from react router
*/
function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
