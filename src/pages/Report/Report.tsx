import React, { useEffect, useState } from "react";
import { Button } from "../../ui/Buttons/button";
import { Text } from "../../ui/Texts/text";
import { sendReport } from "../../lib/api";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { useValueToken } from "../../hooks/hooks";
import css from "./Report.css";

export function Report() {
  const [params, setParams] = useState(null);
  const location = useLocation();
  const token = useValueToken();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get("name");
    const id = queryParams.get("id");
    setParams({ name, id });
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const targets = e.target;
    const report = {
      petId: params.id,
      petName: params.name,
      name: targets.name.value,
      tel: parseInt(targets.tel.value),
      report: targets.report.value,
    };
    try {
      const reportSended = await sendReport(report, token);
      if (reportSended) {
        Swal.fire({
          icon: "success",
          text: `${report.name}, muchas gracias por reportar información de ${report.petName}. Se le envió un mail a quien lo busca para que sepa lo que nos contaste.`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Algo ha fallado, intenta de nuevo más tarde.",
      });
      console.error(error);
    }
  };

  return (
    <form className={css.report} onSubmit={handleSubmit}>
      <Text type='title' style='bold'>
        {"Reportar info de " + params?.name}
      </Text>
      <label className={css.label}>
        <span>TU NOMBRE</span>
        <input className={css.input} type='text' name='name' />
      </label>
      <label className={css.label}>
        <span>TU TELEFONO</span>
        <input className={css.input} type='phone' name='tel' />
      </label>
      <label className={css.label}>
        <span>¿DÓNDE LO VISTE?</span>
        <textarea className={css.input} name='report'></textarea>
      </label>
      <Button type='primary'>Enviar reporte</Button>
    </form>
  );
}
