import React, { useEffect, useState } from "react";
import { Button } from "ui/Buttons/button";
import css from "./ImageUploader.css";
import img from "/assets/missingimg.png";
import { useDropzone } from "react-dropzone";
import { usePetData } from "hooks/hooks";

export function ImageUploader() {
  const [realSrc, setRealSrc] = useState(img);
  const [getRootProps, getInputProps] = dropzonedImg();
  const [petData, setPetData] = usePetData();

  useEffect(() => {
    if (petData.imgURL !== "") setRealSrc(petData.imgURL);
  });
  function dropzonedImg() {
    const { getRootProps, getInputProps } = useDropzone({
      accept: "image/*",
      maxSize: 20000000,
      onDrop: (acceptedFiles) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          setRealSrc(event.target.result);
          setPetData({ ...petData, imgURL: event.target.result });
        };
        reader.readAsDataURL(acceptedFiles[0]);
      },
    });
    return [getRootProps, getInputProps];
  }

  return (
    <label {...getRootProps({ className: ["dropzone", css.label].join(" ") })}>
      <input {...getInputProps()} />
      <img src={realSrc} crossOrigin='anonymous' />
      <Button
        type='secondary'
        onClick={(e) => e.preventDefault()}
        onKeyDown={(e) => e.preventDefault()}>
        agregar/modificar foto
      </Button>
    </label>
  );
}
