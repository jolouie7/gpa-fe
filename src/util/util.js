export const displayCurrentBalance = (currentBalance) => {
  let formattedNumber = "";
  if (currentBalance < 1000) {
    formattedNumber = currentBalance.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });
  } else {
    formattedNumber = currentBalance.toLocaleString("en-US");
  }
  return formattedNumber;
};
