import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const FormInput = ({ inputFields, Info, Name, Type, onChange, index, removeClickHandler }) => {
	return (
		<div className="form">
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
						onChange={(e) => onChange(e, index)}
						value={Info === "Debit Info" ? inputFields.debitInfo : inputFields.creditInfo}
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
						onChange={(e) => onChange(e, index)}
						value={Info === "Debit Info" ? inputFields.debit : inputFields.credit}
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
						onChange={(e) => onChange(e, index)}
						value={Info === "Debit Info" ? inputFields.typeA : inputFields.typeB}
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
				{/* <button disabled={index===0} className="btn btn-primary"
            onClick={(e) => { e.preventDefault();  Name === 'Debit' ? removeClickHandler('d', index) : removeClickHandler('c', index) }}
          >
            -
          </button> */}
				{/* <Button

          variant="outlined"
          color="secondary"
          disabled={index===0}
          onClick={(e) => { e.preventDefault();  Name === 'Debit' ? removeClickHandler('d', index) : removeClickHandler('c', index) }}
           > - </Button> */}

				<IconButton
					onClick={(e) => {
						e.preventDefault();
						Name === "Debit" ? removeClickHandler("d", index) : removeClickHandler("c", index);
					}}
					disabled={index === 0}
					aria-label="delete">
					<DeleteIcon />
				</IconButton>
			</div>
		</div>
	);
};

export default FormInput;
