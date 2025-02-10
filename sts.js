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
    "The teaching is outstanding and well-paced",
    "The explanations are clear and well-structured",
    "The instructor shows deep knowledge and expertise",
    "The content delivery is engaging and effective",
    "The examples help understand complex concepts",
    "The teaching style promotes active learning",
    "The pace allows good understanding",
    "The feedback helps improve learning",
    "The course materials are comprehensive",
    "The instructor welcomes questions and discussions",
    "The content covers key topics thoroughly",
    "The teaching methods engage effectively",
    "The practical work reinforces learning",
    "The course encourages participation",
    "The support helps student growth",
    "The learning environment is positive",
    "The experience is enriching and valuable",
    "The teaching approach is highly effective",
    "Complex topics are explained clearly",
    "The organization helps learning flow",
    "Class participation is encouraged well",
    "The assignments challenge appropriately",
    "The enthusiasm makes learning enjoyable",
    "Resources support learning goals",
    "Critical thinking is developed well",
    "Questions are answered patiently",
    "Active participation is encouraged",
    "The teaching inspires learning",
    "Materials are relevant and current",
    "Growth mindset is encouraged",
    "Student collaboration is effective",
    "Feedback comes regularly",
    "Teaching adapts to student needs",
    "Classes maintain good engagement",
    "Real-world applications are clear",
    "Various teaching methods are used",
    "Problem-solving skills develop well",
    "The environment welcomes everyone",
    "Theory and practice balance well"
  ];

  // Function to generate Responses within character limit
  function generateResponse(question) {
    //function to get randomItems form possibleValues array
    const getRandomItems = (arr, num) => {
      const shuffled = arr.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, num);
    };

    //return response passed on question content
    if (question.includes("like best")) {
      const positives = getRandomItems(possibleValues, 2);
      return `What I liked best was that ${positives[0].toLowerCase()}. Additionally, ${positives[1].toLowerCase()}.`;
    } else if (question.includes("improvement")) {
      const improvements = getRandomItems(possibleValues, 1);
      return `While the course is excellent, ${improvements[0].toLowerCase()} could be further enhanced for even better outcomes.`;
    } else {
      const general = getRandomItems(possibleValues, 2);
      return `The course was excellent overall. ${general[0]}. Also, ${general[1].toLowerCase()}.`;
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
    // Ensure response is within character limit
    if (response.length > 149) {
      console.warn(`Response truncated from ${response.length} characters to 149`);
      textArea.value = response.substring(0, 149);
    } else {
      textArea.value = response;
    }
    console.log(`Response length: ${textArea.value.length} characters`);
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
