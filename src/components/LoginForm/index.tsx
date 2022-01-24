import React from "react";
import { Text } from "../../ui/Texts/text";
import { Button } from "../../ui/Buttons/button";
import css from "./LoginForm.css";

export function LoginForm({ handleSubmit, name, type }) {
  return (
    <form className={css.login} onSubmit={handleSubmit}>
      <Text type='title' style='bold'>
        Ingresar
      </Text>
      <label className={css.label}>
        <Text type='body' style='regular'>
          {name.toUpperCase()}
        </Text>
        <input type={type} name={name} className={css.input} />
      </label>
      <Button type='primary'>Siguiente</Button>
    </form>
  );
}
