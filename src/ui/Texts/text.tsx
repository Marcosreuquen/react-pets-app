import css from "./text.css";
import React from "react";

export function Text({
  type,
  style,
  children,
}: {
  type: string;
  style: string;
  children: string;
}) {
  const classes = `${css[type]} ${css[style]}`;
  return <div className={classes}>{children}</div>;
}
