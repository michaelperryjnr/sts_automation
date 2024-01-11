//I added comments so you can modify
//let's cook :D ;D

async function handleRadiosAndTextareas() {
  // Check and confirm all radios are checked
  const stronglyAgreeRadios = document.querySelectorAll("input[value='5']");
  const allRadiosChecked = await Promise.all(
    Array.from(stronglyAgreeRadios).map(radio => new Promise(resolve => {
      radio.checked = true;
      resolve(radio.checked); // Ensure checked state before resolving
    }))
  );

  if (!allRadiosChecked.every(checked => checked)) {
    console.error("Not all radios were checked successfully.");
    return;
  }

  // Fill in textareas
  for (let i = 1; i <= 4; i++) {
    const textarea = document.querySelector(`.card-content textarea[name='OQ${i}']`);
    const possibleValues = ["Great", "Everything", "Perfect"];
    const randomValue = possibleValues[Math.floor(Math.random() * possibleValues.length)];
    textarea.value = randomValue;
  }

  // Check if all textareas have values
  const allTextareas = document.querySelectorAll(`.card-content textarea[name^='OQ']`);
  const allTextareasFilled = Array.from(allTextareas).every(textarea => textarea.value !== "");

  if (allTextareasFilled) {
    console.log("All done, Hello from Michael!");
  } else {
    console.error("Some textareas remain empty.");
  }
  console.log("This is Michael's way of being Michael :D")
}

handleRadiosAndTextareas(); // Initiate the asynchronous process
