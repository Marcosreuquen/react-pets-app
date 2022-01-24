import * as React from "react";
import { Text } from "../../ui/Texts/text";
import css from "./pet-card.css";
// `<x-pets img=${pet.imgURL} petId=${pet.objectID}>${pet.name}</x-pets>`;

export function PetCard({ img, petId, children, handlePetCardClick }) {
  const handleClick = async (e) => {
    e.preventDefault();
    handlePetCardClick({ id: petId, name: children });
  };

  return (
    <div className={css.card} key={petId}>
      <img className={css.img} src={img} crossOrigin='anonymous' />
      <div className={css.content}>
        <Text type='subtitle' style='bold'>
          {children}
        </Text>
        <a onClick={handleClick} className={css.report}>
          <Text style='regular' type='body'>
            REPORTAR INFORMACIÓN
          </Text>
        </a>
      </div>
    </div>
  );
}
