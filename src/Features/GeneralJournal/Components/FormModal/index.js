/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useId } from "react";
import "./Form.css";
import { useFirestore } from "../../../../hooks/useFirestore";
import "bootstrap/dist/css/bootstrap.min.css";

function FormModal() {
	const { addDocument } = useFirestore("generalEntry");
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
		list[i][name] = value;
		setCreditVal(list);
	};

	const removeClickHandler = (val, index) => {
		if (val === "d") {
			const list = [...debitVal];
			list.splice(index, 1);
			setDebitVal(list);
		} else {
			const list = [...creditVal];
			list.splice(index, 1);
			setCreditVal(list);
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

	// handle click event of the Add button

	const inputFunction = (inputArr, Info, Name, Type, fn) => {
		return inputArr.map((arr, i) => (
			<div key={i + 1} className="form">
				<div>
					<div className="input-group mb-3">
						<span className="input-group-text" id="basic-addon1">
							{" "}
							{Info}:{" "}
						</span>
						<input
							type="text"
							className="form-control"
							placeholder="Account Name"
							aria-label="Username"
							aria-describedby="basic-addon1"
							id={Info}
							onChange={(e) => fn(e, i)}
							value={Info === "Debit Info" ? arr.debitInfo : arr.creditInfo}
							name={Info === "Debit Info" ? "debitInfo" : "creditInfo"}
						/>
					</div>
				</div>
				<div>
					<div className="input-group mb-3">
						<span className="input-group-text" id="basic-addon1">
							{" "}
							{Name} Amount :{" "}
						</span>
						<input
							type="number"
							className="form-control"
							placeholder="Amount"
							aria-label="Username"
							aria-describedby="basic-addon1"
							id={Name}
							onChange={(e) => fn(e, i)}
							value={Info === "Debit Info" ? arr.debit : arr.credit}
							name={Name === "Debit" ? "debit" : "credit"}
						/>
					</div>
				</div>
				<div>
					<div className="input-group mb-3">
						<span className="input-group-text" id="basic-addon1">
							{" "}
							{Type}{" "}
						</span>
						<select
							className="form-control"
							id="TypeA"
							onChange={(e) => fn(e, i)}
							value={Info === "Debit Info" ? arr.typeA : arr.typeB}
							name={Type === "Type A" ? "typeA" : "typeB"}>
							<option value="">Select Type</option>
							<option value="Asset">Asset</option>
							<option value="Liability">Liability</option>
							<option value="Owner Equity">Owner Equity</option>
							<option value="Revenue">Revenue</option>
							<option value="Expense">Expense</option>
							<option value="Owner withdraw">Owner withdraw</option>
						</select>
					</div>
				</div>
				<div>
					<button
						disabled={i === 0}
						className="btn btn-primary"
						onClick={(e) => {
							Name === "Debit" ? removeClickHandler("d", i) : removeClickHandler("c", i);
						}}>
						-
					</button>
				</div>
			</div>
		));
	};

	const debitInput = inputFunction(debitVal, "Debit Info", "Debit", "Type A", debitInfoChangeHandler);
	const creditInput = inputFunction(creditVal, "Credit Info", "Credit", "Type B", creditInfoChangeHandler);

	const postGeneralEntryHandler = async () => {
		const debitValue = debitVal.reduce((acc, { debit }) => acc + +debit, 0);
		const creditValue = creditVal.reduce((acc, { credit }) => acc + +credit, 0);
		const id = Math.floor(Math.random() * 100);

		if (debitValue === creditValue) {
			const entriesToPost = [...debitVal.map((debitEntry) => debitEntry), ...creditVal.map((creditEntry) => creditEntry)];
			console.log(entriesToPost);
			await addDocument(entriesToPost);
		} else {
			setError("Debit and Credit value should be equal");
		}
	};

	return (
		<div className="form-container">
			<h2> General-Journal Entries </h2>

			<form className="overallform">
				{debitInput}
				{creditInput}
			</form>
			<br />
			<div className="submit-error">
				<div className="entry">
					<div className="center">
						<label>Add Debit Entry </label>
					</div>
					<div className="center">
						<button className={`btn btn-primary `} onClick={() => addClickHandler("d")}>
							+
						</button>
					</div>
				</div>

				<div className="entry">
					<div>
						<label>Add Credit Entry </label>
					</div>
					<div>
						<button className={` btn btn-primary`} onClick={() => addClickHandler("c")}>
							+
						</button>
					</div>
				</div>
				<div className="submit-section">
					<div>
						<p className="alert alert-warning" hidden={!error}>
							{error}
						</p>
						<button type="submit" className={`btn btn-primary `} onClick={postGeneralEntryHandler}>
							Submit
						</button>
					</div>
				</div>
			</div>
			<hr />

			<br />

			<h2> Adjusting Entries </h2>
			<form className="overallform">
				{debitInput}
				{creditInput}
			</form>
			<div className="submit-error">
				<div className="entry">
					<div className="center">
						<label>Add Debit Entry </label>
					</div>
					<div className="center">
						<button className={`btn btn-primary `} onClick={() => addClickHandler("d")}>
							+
						</button>
					</div>
				</div>

				<div className="entry">
					<div>
						<label>Add Credit Entry HELLO</label>
					</div>
					<div>
						<button className={` btn btn-primary`} onClick={() => addClickHandler("c")}>
							+
						</button>
					</div>
				</div>
				<div className="submit-section">
					<div>
						<p className="alert alert-warning" hidden={!error}>
							{error}
						</p>
						<button type="submit" className={`btn btn-primary `} onClick={postGeneralEntryHandler}>
							Submit
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FormModal;
