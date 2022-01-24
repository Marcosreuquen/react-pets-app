import { LoginForm } from "../../components/LoginForm";
import React from "react";
import { useNavigate } from "react-router-dom";
import css from "./Login.css";

export function Login() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    // e.preventDefault();
    const email = e.target.email.value;
    navigate(email);
  };
  return (
    <div className={css.login}>
      <LoginForm handleSubmit={handleSubmit} name='email' type='email' />
    </div>
  );
}
