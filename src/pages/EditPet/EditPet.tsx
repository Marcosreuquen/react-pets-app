import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { Button } from "../../ui/Buttons/button";
import { Text } from "../../ui/Texts/text";
import { MyMap } from "../../ui/Map/Map";
import { findedPet, editPet, getPetData } from "../../lib/api";
import { usePetData, useValueToken } from "../../hooks/hooks";
import css from "./EditPet.css";
import { ImageUploader } from "../../ui/ImageUploader/ImageUploader";
import { useNavigate, useParams } from "react-router-dom";

export function EditPet() {
  const [pet, setPet] = usePetData();
  const type = "Editar";
  const token = useValueToken();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      setPetData();
    }
  }, []);

  const setPetData = async () => {
    const petData = await getPetData(parseInt(id));
    setPet(petData);
  };
  const handleSubmit = (e) => {
    //Edita la mascota
    editPet({
      id: pet.id,
      name: pet.name,
      img: pet.imgURL,
      lat: pet.lat,
      lng: pet.lng,
      token,
    })
      .then(() => {
        Swal.fire({ icon: "success" });
      })
      .catch((error) => {
        Swal.fire({ icon: "error", text: error });
      });
  };

  const handleFindedPet = () => {
    //enviar al servidor que se encontró a la mascota
    findedPet(pet.id, token);
    Swal.fire({ icon: "success", title: "Nos alegra mucho!" });
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
          defaultValue={pet.name}
          onChange={handleChangeName}
        />
      </label>
      <ImageUploader />
      <MyMap petLat={pet.lat} petLng={pet.lng} />
      <Button type='primary' handleClick={handleSubmit}>
        Editar
      </Button>
      <Button type='secondary' handleClick={handleFindedPet}>
        Reportar como encontrado
      </Button>
    </div>
  );
}
