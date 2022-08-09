/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useId } from "react";
import { useAuthContext } from "./../../hooks/useAuthContext";
import { useFirestore } from "./../../hooks/useFirestore";
// import "./FormModal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FormInput from "../FormInput/FormInput";
import { Card, CardContent, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    margin: "10px 10px",
    background: "#fafafa",
    border: "2px black solid",
  },
  inner: {
    display: "grid",
    gridTemplateColumns: "40fr 30fr 30fr",
  },
  flex: {
    display: "flex",
    justifyContent: "flexStart",
  },
  scroll: {
    overflowY: "scroll",
    height: "150px",
  },
}));

function FormModal() {
  const classes = useStyles();
  const { dispatch, generalEntry } = useAuthContext();
  const { addDocument, response } = useFirestore("generalEntry");
  const { addDocument: doc, response: resp } = useFirestore("generalEntry");

  const [debitVal, setDebitVal] = useState([
    {
      debitInfo: "",
      debit: "",
      typeA: "",
    },
  ]);

  const [creditVal, setCreditVal] = useState([
    {
      creditInfo: "",
      credit: "",
      typeB: "",
    },
  ]);
  const [error, setError] = useState("");

  const debitInfoChangeHandler = (e, i) => {
    const { name, value } = e.target;
    const list = [...debitVal];
    list[i][name] = value;
    setDebitVal(list);
  };

  const creditInfoChangeHandler = (e, i) => {
    const { name, value } = e.target;
    const list = [...creditVal];
    // console.log(list[i][name])
    list[i][name] = value;
    // console.log(list);
    setCreditVal(list);
  };

  const removeClickHandler = (val, index) => {
    if (val === "d") {
      let newDebtInputs = debitVal.filter((el, i) => i !== index);
      setDebitVal(newDebtInputs);
    } else {
      let newCreditInputs = debitVal.filter((el, i) => i !== index);
      setCreditVal(newCreditInputs);
    }
  };

  const addClickHandler = (val) => {
    if (val === "d") {
      setDebitVal([
        ...debitVal,
        {
          debitInfo: "",
          debit: "",
          typeA: "",
        },
      ]);
    } else {
      setCreditVal([
        ...creditVal,
        {
          creditInfo: "",
          credit: "",
          typeB: "",
        },
      ]);
    }
  };

  const postGeneralEntryHandler = async () => {
    const debitValue = debitVal.reduce((acc, { debit }) => acc + +debit, 0);
    const creditValue = creditVal.reduce((acc, { credit }) => acc + +credit, 0);
    const id = Math.floor(Math.random() * 100);

    if (debitValue === creditValue) {
      const entriesToPost = [
        ...debitVal.map((debitEntry) => debitEntry),
        ...creditVal.map((creditEntry) => creditEntry),
      ];
      console.log(entriesToPost);
      dispatch({ type: "General_Entry", payload: entriesToPost });
      await addDocument(entriesToPost);
    } else {
      setError("Debit and Credit value should be equal");
    }
  };

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <h2> General-Journal Entries</h2>
          <div className={classes.scroll}>
            <form>
              {debitVal.map((debtValInput, index) => (
                <FormInput
                  inputFields={debtValInput}
                  Info={"'Debit Info'"}
                  Name={"Debit"}
                  Type={"Type A"}
                  onChange={debitInfoChangeHandler}
                  index={index}
                  removeClickHandler={removeClickHandler}
                />
              ))}
              {creditVal.map((creditValValInput, index) => (
                <FormInput
                  inputFields={creditValValInput}
                  Info={"'Credit Info'"}
                  Name={"Credit"}
                  Type={"Type B"}
                  onChange={creditInfoChangeHandler}
                  index={index}
                  removeClickHandler={removeClickHandler}
                />
              ))}
            </form>
          </div>
          <div className={classes.inner}>
            <div
              className="entry"
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              <label>Add Debit Entry</label>
              <div>
                <button
                  className={` btn btn-primary`}
                  onClick={() => addClickHandler("c")}
                >
                  +
                </button>
              </div>
            </div>
            <div
              className="entry"
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              <label>Add Credit Entry</label>
              <div>
                <button
                  className={` btn btn-primary`}
                  onClick={() => addClickHandler("c")}
                >
                  +
                </button>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p className="alert alert-warning" hidden={!error}>
                {error}
              </p>
              <button
                type="submit"
                className={`btn btn-primary `}
                onClick={postGeneralEntryHandler}
              >
                Submit
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className={classes.root}>
        <CardContent>
          <h2> Adjusting Entries </h2>
          <div className={classes.scroll}>
            <form>
              {debitVal.map((debtValInput, index) => (
                <FormInput
                  inputFields={debtValInput}
                  Info={"'Credit Info'"}
                  Name={"Credit"}
                  Type={"Type A"}
                  onChange={debitInfoChangeHandler}
                  index={index}
                  removeClickHandler={removeClickHandler}
                />
              ))}
              {creditVal.map((creditValValInput, index) => (
                <FormInput
                  inputFields={creditValValInput}
                  Info={"'Credit Info'"}
                  Name={"Credit"}
                  Type={"Type B"}
                  onChange={creditInfoChangeHandler}
                  index={index}
                  removeClickHandler={removeClickHandler}
                />
              ))}
            </form>
          </div>
          <div className={classes.inner}>
            <div
              className="entry"
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              <div className="center">
                <label>Add Debit Entry </label>
              </div>
              <div className="center">
                <button
                  className={`btn btn-primary `}
                  onClick={() => addClickHandler("d")}
                >
                  +
                </button>
              </div>
            </div>

            <div
              className="entry"
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              <div>
                <label>Add Credit Entry </label>
              </div>
              <div>
                <button
                  className={` btn btn-primary`}
                  onClick={() => addClickHandler("c")}
                >
                  +
                </button>
              </div>
            </div>
            <div
              className="submit-section"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div>
                <p className="alert alert-warning" hidden={!error}>
                  {error}
                </p>
                <button
                  type="submit"
                  className={`btn btn-primary `}
                  onClick={postGeneralEntryHandler}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default FormModal;
