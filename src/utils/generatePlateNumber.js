export function generateSequentialString(previousSequentialString) {
  let nextLetterCode, nextNum;

  if (previousSequentialString) {
    // Extract the letter and number from the previous string
    const previousLetter = previousSequentialString.charAt(2);
    const previousNum = parseInt(previousSequentialString.substr(3));

    if (previousNum === 999) {
      // If the number is at its maximum, increment the letter
      nextLetterCode = previousLetter.charCodeAt(0) + 1;
      nextNum = 0;
    } else {
      // Otherwise, increment the number
      nextLetterCode = previousLetter.charCodeAt(0);
      nextNum = previousNum + 1;
    }

    // Handle edge case when reaching 'Z'
    if (nextLetterCode > 90) {
      nextLetterCode = 65; // Reset to 'A'
      nextNum = 0;
    }
  } else {
    // Start from the initials
    nextLetterCode = 65; // ASCII code for 'A'
    nextNum = 0;
  }

  // Convert the letter code to a character
  const nextLetter = String.fromCharCode(nextLetterCode);

  // Pad the number with leading zeros to make it three digits
  const nextNumber = nextNum.toString().padStart(3, "0");

  // Construct the sequential string
  const sequentialString = "RA" + nextLetter + nextNumber;

  return sequentialString;
}

