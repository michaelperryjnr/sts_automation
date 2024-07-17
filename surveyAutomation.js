//I added comments so you can modify
//let's cook :D ;D
// I used local storage
//automate 208 form filling
function fillContributionForm() {
  // Retrieve team member IDs from local storage or prompt user for input
  let teamMemberIDs = JSON.parse(localStorage.getItem("teamMemberIDs")) || [];
  if (teamMemberIDs.length === 0) {
    teamMemberIDs = [];
    for (let i = 1; i <= 7; i++) {
      let id = prompt(
        `Enter ID for team member ${i} (Note: Make Your Id the last one):`
      );
      teamMemberIDs.push(id);
    }
    localStorage.setItem("teamMemberIDs", JSON.stringify(teamMemberIDs));
  }

  // Retrieve scores from local storage or prompt user for input
  let scores = JSON.parse(localStorage.getItem("scores")) || [];
  if (scores.length === 0) {
    scores = [];
    for (let i = 1; i <= 7; i++) {
      let score = prompt(`Enter score for team member ${i}:`);
      score = parseInt(score);
      if (!isNaN(score) && score <= 100) {
        scores.push(score);
      } else {
        console.log(
          `Invalid score entered for team member ${i}. Using default score.`
        );
        scores.push(0); // Use a default score if input is invalid
      }
    }
    localStorage.setItem("scores", JSON.stringify(scores));
  }

  // Function to shuffle the scores array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Shuffle the scores
  scores = shuffleArray(scores);
  console.log("Randomized scores:", scores);
  console.log(
    "Sum of scores:",
    scores.reduce((a, b) => a + b, 0)
  );

  // Get all ID and score input fields
  const idInputs = document.querySelectorAll(
    'input[placeholder="Number must be between 10835819 ~ 22011242"]'
  );
  const scoreInputs = document.querySelectorAll(
    'input[placeholder="Please enter a number less than or equal to 100"]'
  );

  console.log("Found ID inputs:", idInputs.length);
  console.log("Found score inputs:", scoreInputs.length);

  // Fill in team member IDs and shuffled scores
  for (let i = 0; i < Math.min(teamMemberIDs.length, scores.length, 7); i++) {
    if (idInputs[i] && scoreInputs[i]) {
      idInputs[i].value = teamMemberIDs[i];
      scoreInputs[i].value = scores[i];

      // Trigger input event to notify form of changes
      idInputs[i].dispatchEvent(new Event("input", { bubbles: true }));
      scoreInputs[i].dispatchEvent(new Event("input", { bubbles: true }));

      console.log(
        `Set ID ${i + 1} to ${teamMemberIDs[i]} and score to ${scores[i]}`
      );
    } else {
      console.log(`Missing input field for index ${i}`);
    }
  }

  // Set the "Are you sure" radio button to "Yes"
  const yesRadio = document.querySelector('input[value="Yes"][type="radio"]');
  if (yesRadio) {
    yesRadio.checked = true;
    yesRadio.dispatchEvent(new Event("change", { bubbles: true }));
    console.log("Set 'Are you sure' to Yes");
  } else {
    console.log("Could not find 'Yes' radio button");
  }

  console.log("Form filled with the following scores:", scores);
}

// Initiate automation
fillContributionForm();
