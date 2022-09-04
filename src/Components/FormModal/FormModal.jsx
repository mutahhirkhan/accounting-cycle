/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@material-ui/core";
import React from "react";
import Adjusting from "./Adjusting";
import GneralEntry from "./GneralEntry";
import "./FormModal.css";
import { useStyles } from "../../utils";

function FormModal() {
  const classes = useStyles();
  const [formType, setFormType] = React.useState("general-entry");
  return (
      <div className="authFormWrapper">
        <div />

        <div className="authForm flex">
          <div className="authform-switcher">
            <Button
              onClick={() => setFormType("general-entry")}
              variant="contained"
              className={classes.creditDebitBtn}
            >
              General Entry
            </Button>
            <Button
              onClick={() => setFormType("adjusting-entry")}
              variant="contained"
              style={{ position: "relative", justifySelf: "end" }}
              className={classes.creditDebitBtn}
            >
              Adjusting Entry
            </Button>
          </div>
          <div className="authform-fields center">
            {formType === "general-entry" ? <GneralEntry /> : <Adjusting />}
          </div>
        </div>

        <div />
      </div>
  );
}

export default FormModal;
