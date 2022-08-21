import { makeStyles } from '@material-ui/core/styles';

export const allTypesData = (documents) => {
	let revTotal = 0; //is
	let expTotal = 0; //is
	let netTotal = 0; //is
	let ownerWithDraw = 0;
	let assetsTotal = 0; //bs
	let liabTotal = 0; //bs
	let ownerEquity = 0; //bs
	let endingOwnerEquity = 0; //bs
	let tbBalances = {};

	documents &&
		documents.map((arr) => {
			for (let i = 0; i < Object.keys(arr).length; i++) {
				const { typeA, debit, typeB, credit, debitInfo, creditInfo } = arr[i] || {}; //type and amount

				tbBalances = calculateBalancesForTrialBalance({ typeA, debit, typeB, credit, debitInfo, creditInfo }, tbBalances);

				if (typeA == "Expense") expTotal += Number(debit);
				else if (typeA == "Owner withdraw") ownerWithDraw += Number(debit);
				else if (typeA == "Revenue") revTotal -= Number(debit);
				else if (typeA == "Asset") assetsTotal += Number(debit);
				else if (typeA == "Liability") liabTotal -= Number(debit);
				else if (typeB == "Revenue") revTotal += Number(credit);
				else if (typeB == "Owner Equity") ownerEquity += Number(credit);
				else if (typeB == "Asset") assetsTotal -= Number(credit);
				else if (typeB == "Liability") liabTotal += Number(credit);
			}
		});
	netTotal = revTotal - expTotal;
	endingOwnerEquity = netTotal - ownerWithDraw;
	// console.log("TBBBB");
	// console.log(tbBalances);
	// console.log("TBBBB");
	// console.log(assetsTotal,liabTotal);
	return {
		revTotal,
		expTotal,
		netTotal,
		ownerWithDraw,
		assetsTotal,
		liabTotal,
		ownerEquity,
		endingOwnerEquity,
		tbBalances
	};
};


/**
 * this modelled data us used in 
 * Trial balance 
 * Adjusted trial balance
 * Balance Sheet
 * Income Statement
 * Owner's Equity Statmenet 
 */
const calculateBalancesForTrialBalance = (obj, tbBalances) => {

	const { typeA, debit, typeB, credit, debitInfo, creditInfo } = obj || {}; //type and amount

	//is destructuring from empty field e.g. createdAt
	if (!obj["creditInfo"]) return tbBalances;

	let isValidAccount = ["Asset", "Owner withdraw", "Expense", "Liability", "Owner Equity", "Revenue"].some(
		(el) => el == typeA || el == typeB
	);

	if (isValidAccount) {
		if (credit) {
			//if cash account is not created in tbBalnce then create first
			if (tbBalances[obj["creditInfo"]]) {
				//checking amount to set nature, and nature to set amount
				//this check is, if current amount is greater than previous and previous nature was credit
				if (Number(credit) > tbBalances[obj["creditInfo"]].amount) {
					//adding on same nature because it's rule for ledger accounts
					if (tbBalances[obj["creditInfo"]].nature == "credit") {
						tbBalances[obj["creditInfo"]].amount += Number(credit);
					}
					// subtracting on different natures because it's rule for ledger accounts
					else {
						tbBalances[obj["creditInfo"]].amount = Number(credit) - tbBalances[obj["creditInfo"]].amount;
					}
					//setting nature to credit in last because, we have to compare with previous
					tbBalances[obj["creditInfo"]].nature = "credit";
				}
				//this check is, if current amount is lesser than previous and previous nature was debit
				else {
					//keep the nature as it was, because current entry amount is less than previous amount
					if (tbBalances[obj["creditInfo"]].nature == "credit") {
						tbBalances[obj["creditInfo"]].amount += Number(credit);
					}
					// subtracting on different natures because it's rule for ledger accounts
					else {
						tbBalances[obj["creditInfo"]].amount = tbBalances[obj["creditInfo"]].amount - Number(credit);
					}
				}
			}
			//direct setting the nature and amount, because object is not created yet
			else
				tbBalances[obj["creditInfo"]] = {
					nature: "credit",
					amount: Number(credit),
					type: typeA ? typeA : typeB
				};
		}
		// DEBIT entry for asset, owner withdraw and expense
		else {
			//subtracting on different natures becasue it's rule to subtract on different nature and add on same nature
			if (tbBalances[obj["creditInfo"]]) {
				//checking amount to set nature, and nature to set amount
				//this check is, if current amount is greater than previous and previous nature was credit
				if (Number(debit) > tbBalances[obj["creditInfo"]].amount) {
					//adding on same nature because it's rule for ledger accounts
					if (tbBalances[obj["creditInfo"]].nature == "debit") {
						tbBalances[obj["creditInfo"]].amount += Number(debit);
					}
					// subtracting on different natures because it's rule for ledger accounts
					else {
						tbBalances[obj["creditInfo"]].amount = Number(debit) - tbBalances[obj["creditInfo"]].amount;
					}
					//setting nature to credit in last because, we have to compare with previous
					tbBalances[obj["creditInfo"]].nature = "debit";
				}
				//this check is, if current amount is lesser than previous and previous nature was debit
				else {
					//keep the nature as it was, because current entry amount is less than previous amount
					if (tbBalances[obj["creditInfo"]].nature == "debit") {
						tbBalances[obj["creditInfo"]].amount += Number(debit);
					}
					// subtracting on different natures because it's rule for ledger accounts
					else {
						tbBalances[obj["creditInfo"]].amount = tbBalances[obj["creditInfo"]].amount - Number(debit);
					}
				}
			} else {
				tbBalances[obj["creditInfo"]] = {
					nature: "debit",
					amount: Number(debit),
					type: typeA ? typeA : typeB
				};
			}
		}
		//return the updated tbBalances object
		return tbBalances;
	}

	//if none of them matched with pre-defined accounts, return the original tbBalances object
	return tbBalances;
};

export const useStyles = makeStyles({
	root: {
	  borderRadius:'50px',
	  "& .MuiTableCell-head": {
		color: "white",
		background: "linear-gradient(#8360c3, #2ebf91)"
	  },
	}
  });