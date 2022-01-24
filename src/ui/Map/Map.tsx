import React, { useState, useRef, useEffect } from "react";
import { Text } from "../Texts/text";
import { Button } from "../Buttons/button";
import mapboxgl, { Marker } from "mapbox-gl";
import css from "./Map.css";
import { useLinkClickHandler } from "react-router-dom";
import { usePetData } from "hooks/hooks";

const mapboxToken =
  "pk.eyJ1IjoibWFyY29zcmV1cXVlbiIsImEiOiJja3UxbXBzbHQzejJvMnBwcW4yN3pqemZuIn0.z65srWhOb5sS3GilPljOpw";

mapboxgl.accessToken = mapboxToken;

export function MyMap(props) {
  const [petData, setPetData] = usePetData();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(petData.lng);
  const [lat, setLat] = useState(petData.lat);
  const [zoom, setZoom] = useState(12);
  const [query, setQuery] = useState("");

  useEffect(() => {
    //Crea el mapa
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    //Crea evento para modificar latitud y longitud si el mapa se mueve
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  useEffect(() => {
    //Si la mascota no tiene posición definida, define la posición de acuerdo a la del dispositivo
    if (petData.lat == 0 && petData.lng == 0) {
      navigator.geolocation.getCurrentPosition(async (geo) => {
        if (!map.current) return; // wait for map to initialize
        const { latitude, longitude } = geo.coords;
        map.current.setCenter([longitude, latitude]);
      });
    }
  });

  const searchGeocoding = async () => {
    //Búsqueda de posición de la mascota
    const { features } = await (
      await fetch(
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
          query +
          ".json?country=ar&types=place%2Caddress%2Clocality%2Cneighborhood%2Cregion%2Cdistrict&access_token=" +
          mapboxToken
      )
    ).json();
    const longitude = features["0"].geometry.coordinates[0];
    const latitude = features["0"].geometry.coordinates[1];
    map.current.setCenter([longitude, latitude]);
    //setea estado de acuerdo a la búsqueda
    setLng(longitude);
    setLat(latitude);
    //Guarda los nuevos datos
    setPetData({ ...petData, lat: latitude, lng: longitude });
  };
  function inputChangeHandler(e) {
    setQuery(e.target.value);
  }
  function keydownInputHandler(e) {
    // si no es con form, tengo que agregar esto
    if (e.key == "Enter") {
      searchGeocoding();
    }
  }

  return (
    <div className={css.label}>
      <Text type='subtitle' style='regular'>
        UBICACION
      </Text>
      <Text type='body' style='regular'>
        BUSCÁ UN PUNTO DE REFERENCIA PARA REPORTAR A TU MASCOTA. PUEDE SER UNA
        DIRECCIÓN, UN BARRIO O UNA CIUDAD
      </Text>
      <div>
        <input
          type='text'
          onChange={inputChangeHandler}
          onKeyDown={keydownInputHandler}
          value={query}
        />
        <button onClick={searchGeocoding}>Buscar</button>
      </div>
      <div ref={mapContainer} className={css.mapContainer}>
        <div className={css.sidebar}>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
    </div>
  );
}
