import React from "react";
import css from "./Loader.css";

export function Loader() {
  return (
    <div className={css["lds-ellipsis"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
