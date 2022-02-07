import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";

const PageRoute = (
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
);

export default PageRoute;
