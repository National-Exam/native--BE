export function generateToken(amount, meterNumber) {
  // Check if the amount is less than 100 or not a multiple of 100
  if (amount < 100 || amount % 100 !== 0) {
    return "Invalid amount. Please enter a multiple of 100 greater than or equal to 100.";
  }

  // Calculate the number of days based on the amount
  var numberOfDays = amount / 100;

  // Ensure the number of days does not exceed 5 years (1825 days)
  numberOfDays = Math.min(numberOfDays, 1825);

  // Generate a unique timestamp
  var timestamp = Date.now();

  // Combine the meter number, number of days, and timestamp to form a unique token
  var token =
    meterNumber.toString().slice(1) +
    numberOfDays.toString() +
    timestamp.toString().slice(-2);
  

  return { days: numberOfDays, token };
}



