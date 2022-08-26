/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import Adjusting from "./Adjusting";
import GneralEntry from "./GneralEntry";

function FormModal() {
  return (
    <div>
      <GneralEntry />
      <Adjusting />
    </div>
  );
}

export default FormModal;
