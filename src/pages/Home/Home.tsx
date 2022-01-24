import React, { useEffect, useState } from "react";
import { Text } from "../../ui/Texts/text";
import { Button } from "../../ui/Buttons/button";
import { PetCard } from "../../components/PetCard/pet-card";
import { getPetsAroundMe } from "../../lib/api";
import * as _ from "lodash";
import css from "./Home.css";
import { useNavigate } from "react-router-dom";

export function Home() {
  const [pets, setPets] = useState(null);
  const [geoloc, setGeoloc] = useState(null);
  const navigate = useNavigate();

  const setPosition = async () => {
    navigator.geolocation.getCurrentPosition(async (geo) => {
      const { latitude, longitude } = geo.coords;
      setGeoloc({ lat: latitude, lng: longitude });
    });
  };

  const getPets = async () => {
    const petsAroundResponse = await (await getPetsAroundMe(geoloc)).json();
    setPets(petsAroundResponse);
  };
  useEffect(() => {
    if (geoloc) {
      getPets();
    }
  }, [geoloc]);

  const handlePetCardClick = ({ name, id }) => {
    navigate(`report?name=${name}&id=${id}`, { replace: true });
  };

  return pets ? (
    <div>
      <Text type='title' style='bold'>
        Mascotas perdidas cerca tuyo
      </Text>
      <div className={css.petsContainer}>
        {_.map(pets, (pet) => {
          return (
            <PetCard
              img={pet.imgURL}
              petId={pet.objectID}
              handlePetCardClick={handlePetCardClick}>
              {pet.name}
            </PetCard>
          );
        })}
      </div>
    </div>
  ) : (
    <div className={css.petsContainer}>
      <Text type='title' style='bold'>
        Mascotas perdidas cerca tuyo
      </Text>
      <Text type='subtitle' style='thin'>
        Para ver las mascotas reportadas cerca tuyo necesitamos permiso para
        conocer tu ubicación.
      </Text>
      <Button type='primary' handleClick={setPosition}>
        Dar mi ubicación
      </Button>
    </div>
  );
}
