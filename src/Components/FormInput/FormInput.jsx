import React from "react";
import {IconButton, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";


const FormInput = ({ inputFields, Info, Name, Type, onChange, index, removeClickHandler }) => {
	return (
		<div className="form">
			
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
