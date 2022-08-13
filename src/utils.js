
export const allTypesData = (documents) => {
    let revTotal = 0;
    let expTotal = 0;
    let netTotal = 0;
    let ownerWithDraw = 0;
    let assetsTotal = 0;
    let liabTotal = 0;
    let ownerEquity = 0;
    let endingOwnerEquity = 0;
    documents &&
      documents.map((arr) => {
        for (let i = 0; i < Object.keys(arr).length; i++) {
          // counter++;
          const { typeA, debit, typeB, credit } = arr[i] || {}; //type and amount

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
