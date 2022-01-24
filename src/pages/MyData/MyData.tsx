import Swal from "sweetalert2";
import React, { useEffect } from "react";
import { Text } from "../../ui/Texts/text";
import { Button } from "../../ui/Buttons/button";
import { updateUser, createUser } from "../../lib/api";
import { useUserData, useValueToken } from "../../hooks/hooks";
import css from "./MyData.css";
import { useNavigate } from "react-router-dom";

export function MyData() {
  const [userData, setUserData] = useUserData();
  const token = useValueToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const targets = e.target;
    const values = {
      name: targets.name.value,
      password: targets.password.value,
      repeatedPassword: targets.repeatedPassword.value,
    };

    if (values.password === values.repeatedPassword) {
      if (token) {
        try {
          const { user } = await updateUser(token, values);
          Swal.fire({
            icon: "success",
          });
          setUserData(user);
        } catch (err) {
          Swal.fire({
            icon: "error",
            text: "Algo salió mal, intentá de nuevo.",
          });
        }
      } else {
        Swal.fire({
          icon: "warning",
          text: "Verificar las contraseñas. No son iguales.",
        });
      }
    }
  };
  return (
    <form className={css.login} onSubmit={handleSubmit}>
      <Text type='title' style='bold'>
        Mis datos
      </Text>
      <label>
        <span>NOMBRE</span>
        <input type='text' name='name' defaultValue={userData.name} />
      </label>
      <label>
        <span>CONTRASEÑA</span>
        <input
          type='password'
          name='password'
          className='password'
          defaultValue={userData.password}
        />
      </label>
      <label>
        <span>REPETIR CONTRASEÑA</span>
        <input
          type='password'
          name='repeatedPassword'
          className='password'
          defaultValue={userData.password}
        />
      </label>
      <Button type='primary'>Guardar</Button>
    </form>
  );
}
