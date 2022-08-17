/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useId } from "react";
import { useAuthContext } from "./../../hooks/useAuthContext";
import { useFirestore } from "./../../hooks/useFirestore";
import "./FormModal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FormInput from "../FormInput/FormInput";
import { Card, CardContent, makeStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(() => ({
	root: {
		margin: "30px",
		background: "#fafafa",
		boxShadow: "2px 1px 20px 0px #bdbdbd",
		borderRadius: "12px",
	},
	inner: {
		display: "grid",
		gridTemplateColumns: "40fr 30fr 30fr",
	},
	scroll: {
		overflowY: "scroll",
		height: "180px",
	},
	creditDebitBtn: {
		background: "#00667e",
		color: "white",
		"&:hover": {
			background: "#303952",
		},
	},
}));

function FormModal() {
	let mockDebitEntries = {
		debitInfo: "",
		debit: "",
		typeA: "",
	};
	let mockCreditEntries = {
		creditInfo: "",
		credit: "",
		typeB: "",
	};
	const classes = useStyles();
	const { dispatch, generalEntry } = useAuthContext();
	const { addDocument, response } = useFirestore("generalEntry");
	const { addDocument: doc, response: resp } = useFirestore("generalEntry");

	const [debitVal, setDebitVal] = useState([mockDebitEntries]);

	const [creditVal, setCreditVal] = useState([mockCreditEntries]);

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
				{
					debitInfo: "",
					debit: "",
					typeA: "",
				},
				...debitVal,
			]);
		} else {
			setCreditVal([
				{
					creditInfo: "",
					credit: "",
					typeB: "",
				},
				...creditVal,
			]);
		}
	};

	const postGeneralEntryHandler = async () => {
		const debitValue = debitVal.reduce((acc, { debit }) => acc + +debit, 0);
		const creditValue = creditVal.reduce((acc, { credit }) => acc + +credit, 0);
		const id = Math.floor(Math.random() * 100);

		if (debitValue === creditValue) {
			const entriesToPost = [...debitVal.map((debitEntry) => debitEntry), ...creditVal.map((creditEntry) => creditEntry)];
			console.log(entriesToPost);
			dispatch({ type: "General_Entry", payload: entriesToPost });
			await addDocument(entriesToPost);
			setDebitVal([mockDebitEntries]);
      setCreditVal([mockCreditEntries]);
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
						<div className="entry" style={{ display: "flex", justifyContent: "flex-start" }}>
							<Button className={classes.creditDebitBtn} onClick={() => addClickHandler("d")} variant="contained">
								Add Debit Entry
							</Button>
						</div>
						<div className="entry" style={{ display: "flex", justifyContent: "flex-start" }}>
							<Button className={classes.creditDebitBtn} onClick={() => addClickHandler("c")} variant="contained">
								Add Credit Entry
							</Button>
						</div>
						<div style={{ display: "flex", justifyContent: "center" }}>
							<p className="alert alert-warning" hidden={!error}>
								{error}
							</p>
							<Button className={classes.creditDebitBtn} type="submit" onClick={postGeneralEntryHandler}>
								{" "}
								Submit{" "}
							</Button>
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
						<div className="entry" style={{ display: "flex", justifyContent: "flex-start" }}>
							<Button className={classes.creditDebitBtn} onClick={() => addClickHandler("d")} variant="contained">
								Add Debit Entry
							</Button>
						</div>
						<div className="entry" style={{ display: "flex", justifyContent: "flex-start" }}>
							<Button className={classes.creditDebitBtn} onClick={() => addClickHandler("c")} variant="contained">
								Add Credit Entry
							</Button>
						</div>
						<div style={{ display: "flex", justifyContent: "center" }}>
							<p className="alert alert-warning" hidden={!error}>
								{error}
							</p>
							<Button className={classes.creditDebitBtn} type="submit" onClick={postGeneralEntryHandler}>
								{" "}
								Submit{" "}
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

export default FormModal;
