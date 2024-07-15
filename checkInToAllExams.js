/**
 * checkInToAllExams
 * @bundana :: https://github.com/bundana
 * This function automates the process of clicking on all "Check In to Exam" buttons on the webpage.
 * It iterates through each button with the class `checkmein` and simulates a click event.
 * An optional delay can be added between each click to avoid server rate limits or ensure processing.
 */
async function checkInToAllExams() {
  // Select all "Check In to Exam" buttons
  const checkInButtons = document.querySelectorAll(".checkmein");

  // Iterate over each button
  for (const button of checkInButtons) {
    // Simulate a click event on the button
    button.click();

    // Optional: Add a delay between each click if needed (e.g., to avoid server rate limits)
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
  }

  // Log a success message once all buttons have been clicked
  console.log("Checked in to all exams successfully.");
}

// Call the function to start the process
checkInToAllExams();
