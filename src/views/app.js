import React from "react";
import {BrowserRouter} from "react-router-dom";
import ROUTES, {RenderRoutes} from "../config/route";

import "../assets/style.scss"

export default function App(){
  return (
    <BrowserRouter>
      <RenderRoutes routes={ROUTES} />
    </BrowserRouter>
  )
}
