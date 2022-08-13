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
	console.log("==============");

	documents &&
		documents.map((arr) => {
			for (let i = 0; i < Object.keys(arr).length; i++) {
				// counter++;
				const { typeA, debit, typeB, credit, debitInfo, creditInfo } = arr[i] || {}; //type and amount

				tbBalances = calculateBalancesForTrialBalance({ typeA, debit, typeB, credit, debitInfo, creditInfo }, tbBalances);

				if (typeA == "Expense") expTotal += Number(debit);
				else if (typeA == "Owner withdraw") ownerWithDraw += Number(debit);
				else if (typeA == "Revenue") revTotal -= Number(debit);
				else if (typeA == "Asset") {
					// console.log('add', creditInfo, debitInfo, debit);
					assetsTotal += Number(debit);
				} else if (typeA == "Liability") liabTotal -= Number(debit);
				else if (typeB == "Revenue") revTotal += Number(credit);
				else if (typeB == "Owner Equity") ownerEquity += Number(credit);
				else if (typeB == "Asset") {
					// console.log('less', creditInfo, debitInfo, credit);
					assetsTotal -= Number(credit);
				} else if (typeB == "Liability") liabTotal += Number(credit);
			}
			// console.log("after tb", tbBalances);
		});
	netTotal = revTotal - expTotal;
	endingOwnerEquity = netTotal - ownerWithDraw;
	console.log("TBBBB");
	console.log(tbBalances);
	console.log("TBBBB");
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
	};
};

const calculateBalancesForTrialBalance = (obj, tbBalances) => {
	// if(!tbBalances)  {
	// console.log('gotcha',obj);
	// // return tbBalances
	// }
	// console.log("tbBalace", tbBalances);

	const { typeA, debit, typeB, credit, debitInfo, creditInfo } = obj || {}; //type and amount

	//is destructuring from empty field e.g. createdAt
	if (!obj["creditInfo"]) return tbBalances;

	let isAssetWithdrawExpense = ["Asset", "Owner withdraw", "Expense"].some((el) => el == typeA || el == typeB);

	if (isAssetWithdrawExpense) {
		if (obj["creditInfo"] == "cash") {
			console.log("cash nature before", tbBalances[obj["creditInfo"]]?.nature, tbBalances[obj["creditInfo"]]?.amount);
		}
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
				};
			}
		}
		if (obj["creditInfo"] == "cash") {
			console.log("cash nature after", tbBalances[obj["creditInfo"]]?.nature, tbBalances[obj["creditInfo"]]?.amount);
		}
		//return the updated tbBalances object
		return tbBalances;
	}
	/**
   * 
  
  if (typeA == "Asset" || typeB == "Asset") {
		if (credit) {
      //adding on same nature because it's rule for ledger account
      //if cash account is not created in tbBalnce then create first
			if (tbBalances[obj["creditInfo"]]) tbBalances[obj["creditInfo"]] += Number(credit);
			else tbBalances[obj["creditInfo"]] = Number(credit);
		} else {
      //subtracting on different natures becasue it's rule to subtract on different nature and add on same nature
			if (tbBalances[obj["creditInfo"]]) tbBalances[obj["creditInfo"]] -= Number(debit);
			else tbBalances[obj["creditInfo"]] = Number(debit);
		}
    if(obj["creditInfo"] == 'cash') console.log(debit, credit);
    console.log("checking cash",tbBalances.cash);
    return tbBalances;
	}
	if (typeA == "Owner withdraw" || typeB == "Owner withdraw") {
		if (credit) {
			if (tbBalances[obj["creditInfo"]]) tbBalances[obj["creditInfo"]] += Number(credit);
			else tbBalances[obj["creditInfo"]] = Number(credit);
		} else {
			if (tbBalances[obj["creditInfo"]]) tbBalances[obj["creditInfo"]] -= Number(debit);
			else tbBalances[obj["creditInfo"]] = Number(debit);
		}
		return tbBalances;
	}
	if (typeA == "Expense" || typeB == "Expense") {
		if (credit) {
			if (tbBalances[obj["creditInfo"]]) tbBalances[obj["creditInfo"]] += Number(credit);
			else tbBalances[obj["creditInfo"]] = Number(credit);
		} else {
			if (tbBalances[obj["creditInfo"]]) tbBalances[obj["creditInfo"]] -= Number(debit);
			else tbBalances[obj["creditInfo"]] = Number(debit);
		}
		return tbBalances;
	}
  */

	//if none of them matched, return the original tbBalances object
	return tbBalances;
};
