import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../../ui/NavBar/navbar";
import css from "./layout.css";

export function Layout() {
  return (
    <div className={css.root}>
      <header>
        <NavBar />
      </header>
      <Outlet />
    </div>
  );
}
