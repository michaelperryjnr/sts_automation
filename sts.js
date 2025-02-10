//I added comments so you can modify
//let's cook :D ;D

async function handleRadiosAndTextAreas() {
  // Check and confirm all radios are checked
  const stronglyAgreeRadios = document.querySelectorAll("input[value='5']");
  stronglyAgreeRadios.forEach((radio) => (radio.checked = true));

  // Check if all radios are checked
  if (stronglyAgreeRadios.length !== 19) {
    console.error("Not all radio buttons were checked successfully.");
    return;
  }

  /**
   * possible values provide by
   * @bundana:: https://github.com/bundana
   */

  const possibleValues = [
    "The teaching is outstanding",
    "The explanations are clear",
    "The instructor is knowledgeable",
    "The lessons are structured well",
    "The teaching style engages",
    "The examples are relevant",
    "The pace is perfect",
    "The feedback helps greatly",
    "The materials excel",
    "The instructor welcomes questions",
    "The content is thorough",
    "The methods innovate",
    "The examples help",
    "The course engages",
    "The support is great",
    "The environment works",
    "Learning is fun",
    "Techniques work well",
    "Complex topics become simple",
    "Organization is solid",
    "Participation thrives",
    "Assignments challenge well",
    "Enthusiasm shows",
    "Resources help learning",
    "Critical thinking grows",
    "Patience stands out",
    "Active learning thrives",
    "Inspiration flows",
    "Materials stay current",
    "Growth mindset develops",
    "Collaboration works",
    "Feedback comes quickly",
    "Teaching adapts well",
    "Classes stay lively",
    "Real-world links exist",
    "Methods vary nicely",
    "Problem-solving improves",
    "Environment includes all",
    "Theory meets practice"
  ];

  // Function to generate Responses within character limit
  function generateResponse(question) {
    const MAX_CHARS = 149;
    
    //function to get randomItems form possibleValues array
    const getRandomItems = (arr, num) => {
      const shuffled = arr.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, num);
    };

    //function to create response and ensure it's within character limit
    const createLimitedResponse = (template, items) => {
      let response = template(items);
      if (response.length > MAX_CHARS) {
        // If too long, try with fewer items
        while (response.length > MAX_CHARS && items.length > 1) {
          items.pop();
          response = template(items);
        }
        // If still too long, truncate
        if (response.length > MAX_CHARS) {
          response = response.substring(0, MAX_CHARS);
        }
      }
      return response;
    };

    //return response based on question content
    if (question.includes("like best")) {
      const positives = getRandomItems(possibleValues, 2);
      return createLimitedResponse(items => 
        `I liked that ${items[0].toLowerCase()}. Also, ${items[1].toLowerCase()}.`, 
        positives
      );
    } else if (question.includes("improvement")) {
      const improvements = getRandomItems(possibleValues, 1);
      return createLimitedResponse(items => 
        `Could improve how ${items[0].toLowerCase()}.`, 
        improvements
      );
    } else {
      const general = getRandomItems(possibleValues, 2);
      return createLimitedResponse(items => 
        `The course was great. ${items[0].toLowerCase()}. ${items[1].toLowerCase()}.`, 
        general
      );
    }
  }

  //Handle text areas and check if they are filled
  const textAreaCards = document.querySelectorAll(
    ".card-content textarea[name^='OQ']"
  );

  let filledTextAreas = 0;

  textAreaCards.forEach((textArea) => {
    //get text card and question
    const questionCard = textArea.closest(".card");
    const questionText = questionCard
      .querySelector(".card-title")
      .textContent.trim();

    //Respond and set textArea value
    const response = generateResponse(questionText);
    textArea.value = response;
    console.log(`Character count for response: ${response.length}`);
    filledTextAreas++;
  });

  // Check if all text areas were filled
  if (filledTextAreas !== textAreaCards.length) {
    console.error("Not all text areas were filled successfully.");
    return;
  }

  console.log("All radios checked and questions answered, Hello from Michael!");
  console.log(" This is Michael's way of being Michael :D");

  //optional submission after filling
  const submitBtn = document.querySelectorAll("#submitbtn");
  let userConfirmation = false;
  //Options after submit button is found
  if (submitBtn) {
    userConfirmation = confirm("Do you want to submit the form?");
    if (userConfirmation) {
      submitBtn[0].click();
      console.log("Form submitted successfully.");
    } else {
      console.log("Form submission cancelled by user");
    }
  } else {
    console.error("Submit button not found.");
  }

  return {
    radiosChecked: stronglyAgreeRadios.length,
    textAreasFilled: filledTextAreas,
    formSubmitted: submitBtn && userConfirmation,
  };
}

//Initiate automation and log results
handleRadiosAndTextAreas()
  .then((result) => {
    console.log("Operation completed successfully.\n", result);
    console.log(
      `Checked ${result.radiosChecked} radio buttons and filled ${result.textAreasFilled} text areas.`
    );
  })
  .catch((error) => {
    console.error("An error occurred during the operation.", error);
  });
