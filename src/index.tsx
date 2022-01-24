import React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { RecoilRoot } from "recoil";
import { Suspense } from "react";
import { Loader } from "./ui/Loader/Loader";
import "./style.css";

ReactDOM.render(
  <Suspense fallback={<Loader />}>
    <RecoilRoot>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </RecoilRoot>
  </Suspense>,
  document.querySelector(".root")
);
