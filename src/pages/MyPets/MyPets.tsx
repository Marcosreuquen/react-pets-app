import * as _ from "lodash";
import { Text } from "../../ui/Texts/text";
import React, { useEffect, useState } from "react";
import { PetCard } from "../../components/PetCard/pet-card";
import { useValueToken } from "../../hooks/hooks";
import { getMyPets } from "../../lib/api";
import { useNavigate } from "react-router-dom";
import css from "./MyPets.css";

export function MyPets() {
  const token = useValueToken();
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getMyPets(token).then((myPets) => {
        // console.log(myPets);
        setPets(myPets.myPets);
      });
    } else {
      navigate("/login");
    }
  }, []);

  const handlePetCardClick = (e) => {
    const { id } = e;
    navigate("/pet-data/" + id.toString());
  };
  return (
    <div>
      <Text type='title' style='bold'>
        Mis mascotas reportadas
      </Text>
      <div className={css.petsContainer}>
        {pets.length == 0 ? (
          <Text type='body' style='regular'>
            AUN NO REPORTASTE MASCOTAS PERDIDAS
          </Text>
        ) : (
          _.map(pets, (pet) => {
            return (
              <PetCard
                img={pet.imgURL}
                petId={pet.id}
                handlePetCardClick={handlePetCardClick}>
                {pet.name}
              </PetCard>
            );
          })
        )}
      </div>
    </div>
  );
}
