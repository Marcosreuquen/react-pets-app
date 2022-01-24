import React, { useEffect, useState } from "react";
import { LoginForm } from "../../components/LoginForm";
import { useNavigate, useParams } from "react-router-dom";
import { checkMail, createUser, getToken } from "../../lib/api";
import { useTokenState, useUserData } from "../../hooks/hooks";
import Swal from "sweetalert2";
import css from "./Pass.css";

export function Pass() {
  const [exist, setExist] = useState(false);
  const { email } = useParams();
  const [token, setToken] = useTokenState();
  const navigate = useNavigate();
  const [user, setUser] = useUserData();

  useEffect(() => {
    if (token) {
      Swal.fire({
        icon: "success",
        text: "Successfully!",
      });
      navigate("/my-data");
    }
  }, [token]);

  useEffect(() => {
    checkMail(email).then((r) => {
      setUser(r);
      setExist(r.exist);
    });
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    if (exist) {
      getToken(email, password)
        .then((tokenResponse) => {
          setToken(tokenResponse);
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            text: "Algo salió mal, revisa de nuevo los datos ingresados",
            timer: 2000,
          });
        });
    } else {
      createUser({ email, password })
        .then((tokenResponse) => {
          setToken(tokenResponse);
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            text: "Algo salió mal, revisa de nuevo los datos ingresados",
            timer: 2000,
          });
        });
    }
  };
  return (
    <div className={css.login}>
      <LoginForm handleSubmit={handleSubmit} name='password' type='password' />
    </div>
  );
}
