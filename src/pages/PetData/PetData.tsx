import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { Button } from "../../ui/Buttons/button";
import { Text } from "../../ui/Texts/text";
import { MyMap } from "../../ui/Map/Map";
import { createPet, findedPet, editPet } from "../../lib/api";
import { usePetData, useValueToken } from "../../hooks/hooks";
import css from "./petData.css";
import { ImageUploader } from "../../ui/ImageUploader/ImageUploader";
import { useNavigate } from "react-router-dom";

export function PetData() {
  const [pet, setPet] = usePetData();
  const type = "Reportar";
  const token = useValueToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const handleSubmit = async (e) => {
    //Crea la mascota
    try {
      const petCrated = await createPet({
        name: pet.name,
        img: pet.imgURL,
        lat: pet.lat,
        lng: pet.lng,
        token,
      });
      Swal.fire({ icon: "success" });
      setPet(petCrated.petCreated);
    } catch (error) {
      Swal.fire({ icon: "error", text: error });
    }
  };
  const handleReset = () => {
    setPet({ id: 0, name: "", imgURL: "", lat: 0, lng: 0 });
  };

  const handleChangeName = (e) => {
    setPet({ ...pet, name: e.target.value });
  };

  return (
    <div className={css.form}>
      <Text type='title' style='bold'>
        {type + " mascota perdida"}
      </Text>
      <label className={css.label}>
        <Text type='body' style='regular'>
          NOMBRE
        </Text>
        <input
          type='text'
          name='name'
          className={css.input}
          onChange={handleChangeName}
        />
      </label>
      <ImageUploader />
      <MyMap petLat={0} petLng={0} />
      <Button type='primary' handleClick={handleSubmit}>
        {type}
      </Button>
      <Button type='cancel' handleClick={handleReset}>
        Cancelar
      </Button>
    </div>
  );
}
