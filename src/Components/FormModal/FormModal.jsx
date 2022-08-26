/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@material-ui/core";
import React from "react";
import Adjusting from "./Adjusting";
import GneralEntry from "./GneralEntry";
import "./FormModal.css";

function FormModal() {
  const [formType, setFormType] = React.useState("general-entry");
  return (
    <div className="authForm">
    <div className="authform-switcher">
      <Button
        onClick={() => setFormType("general-entry")}
        background="#ffff"
        color="black"
        style={{ position: "relative" }}
      >
        Gneral Entry
        <div className="underLine"></div>
      </Button>
      <Button
        onClick={() => setFormType("adjusting-entry")}
        background="#ffff"
        color="black"
        style={{ position: "relative", justifySelf: "end" }}
      >
        Adjusting Entry
        <div className="underLine"></div>
      </Button>
    </div>
    <div className="authform-fields center">
      {formType === "general-entry" ? <GneralEntry /> :  <Adjusting />}
    </div>
  </div>
    // <div>
    //   <GneralEntry />
    //   <Adjusting />
    // </div>
  );
}

export default FormModal;
