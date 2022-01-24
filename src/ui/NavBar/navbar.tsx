import React, { useState } from "react";
import "../../assets/huella.png";
import "../../assets/burger.png";
import { Button } from "../../ui/Buttons/button";
import { Text } from "../../ui/Texts/text";
import img from "/assets/burger.png";

import css from "./navbar.css";
import { useTokenState, useUserData } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";

export function NavBar() {
  const [user, setUser] = useUserData();
  const [token, setToken] = useTokenState();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  const handleSessionClick = () => {
    if (token) {
      setUser({});
      setToken("");
    } else {
      navigate("/login");
    }
  };

  const handleBurgerClick = () => {
    setIsActive(!isActive);
  };
  return (
    <div className={css.navbar}>
      <div>
        <a href='/' className={css.logo}>
          <img src='/assets/huella.png' />
        </a>
      </div>
      <ul className={css.list}>
        <a href='/my-data' className={css.link}>
          <Text type='body' style='regular'>
            Mis datos
          </Text>
        </a>
        <a href='/my-pets' className={css.link}>
          <Text type='body' style='regular'>
            Mis mascotas reportadas
          </Text>
        </a>
        <a href='/pet-data' className={css.link}>
          <Text type='body' style='regular'>
            Reportar mascota
          </Text>
        </a>
      </ul>
      <div className={css.session}>
        <Text type='body' style='regular'>
          {user?.email ? user.email : ""}
        </Text>
        <button className={css.button} onClick={handleSessionClick}>
          <div className={css.link}>
            {token ? "CERRAR SESION" : "INICIAR SESION"}
          </div>
        </button>
      </div>
      <div className={css.checkbox} onClick={handleBurgerClick}>
        <img src='/assets/burger.png' alt='menu' />
      </div>
      <ul style={{ display: isActive ? "flex" : "none" }} className={css.modal}>
        <a href='/my-data' className={css.link}>
          <Text type='body' style='regular'>
            Mis datos
          </Text>
        </a>
        <a href='/my-pets' className={css.link}>
          <Text type='body' style='regular'>
            Mis mascotas reportadas
          </Text>
        </a>
        <a href='/pet-data' className={css.link}>
          <Text type='body' style='regular'>
            Reportar mascota
          </Text>
        </a>
      </ul>
    </div>
  );
}
