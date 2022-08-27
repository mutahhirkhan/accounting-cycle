import React from "react";
import {IconButton, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
// import TextField from '@mui/material/TextField';


const FormInput = ({ inputFields, Info, Name, Type, onChange, index, removeClickHandler }) => {
	return (
		<div className="form">
			{/* <div>
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
						// here debit info is in the inverted comma, that is why it always render creditInfo as a field
						// "'Debit Info'" === "Debit Info" which is false
						name={Info === "Debit Info" ? "debitInfo" : "creditInfo"}
					/>
				</div>
			</div> */}
			
			<TextField 
				id={`${Info} outlined-size-small`} 
				name={Info === "Debit Info" ? "debitInfo" : "creditInfo"} 
				value={Info === "Debit Info" ? inputFields.debitInfo : inputFields.creditInfo} 
				onChange={(e) => onChange(e, index)} 
				type="text" 
				label= {`${Info} Account Name`} 
				variant="outlined" 
				size="small"
			/>

			{/* <div>
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
			</div> */}

			<TextField 
				id={`${Name} outlined-size-small `} 
				value={Info === "Debit Info" ? inputFields.debit : inputFields.credit} 
				name={Name === "Debit" ? "debit" : "credit"}
				onChange={(e) => onChange(e, index)} 
				type="number" 
				label={`${Name} Amount`} 
				variant="outlined" 
				size="small"
			/>
			<div>
				<div className="input-group mb-3">
					{/* <span className="input-group-text" id="basic-addon1">
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
					</select> */}

      				<FormControl sx={{ minWidth: 200 }}>
						<InputLabel id="demo-controlled-open-select-label">{Type === "Type A" ? "Type A" : "Type B"}</InputLabel>
						<Select
							labelId="demo-controlled-open-select-label"
							id="demo-select-small TypeA"
							value={Info === "Debit Info" ? inputFields.typeA : inputFields.typeB}
							onChange={(e) => onChange(e, index)}
							name={Type === "Type A" ? "typeA" : "typeB"}
							label={Type === "Type A" ? "typeA" : "typeB"}
							size="small"
							// onChange={handleChange}
						>
							<MenuItem value="Asset">Asset</MenuItem>
							<MenuItem value="Liability">Liability</MenuItem>
							<MenuItem value="Owner Equity">Owner Equity</MenuItem>
							<MenuItem value="Revenue">Revenue</MenuItem>
							<MenuItem value="Expense">Expense</MenuItem>
							<MenuItem value="Owner withdraw">Owner withdraw</MenuItem>
						</Select>
					</FormControl>

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
