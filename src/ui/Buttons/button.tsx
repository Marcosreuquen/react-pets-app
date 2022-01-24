import React from "react";
import css from "./button.css";

export function Button(props) {
  return (
    <button
      onClick={props.handleClick}
      className={css[props.type] + " " + css.svgwoosh + " " + css.section}>
      <div className={css.woosh}>
        <svg>
          <rect x='0' y='0' fill='none' width='100%' height='100%'></rect>
        </svg>
        {props.children}
      </div>
    </button>
  );
}
