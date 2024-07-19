//I added comments so you can modify
//let's cook :D ;D

async function handleRadiosAndTextAreas() {
  // Check and confirm all radios are checked
  const stronglyAgreeRadios = document.querySelectorAll("input[value='5']");
  const allRadiosChecked = await Promise.all(
    Array.from(stronglyAgreeRadios).map(
      (radio) =>
        new Promise((resolve) => {
          radio.checked = true;
          radio.dispatchEvent(new Event("change", { bubbles: true }));
          resolve(radio.checked);
        })
    )
  );

  //check for all radios being checked
  if (!allRadiosChecked.every((checked) => checked)) {
    console.error("Not all radios where checked successfully");
    return;
  }

  /**
   * possible values provide by
   * @bundana:: https://github.com/bundana
   */

  const possibleValues = [
    "The teaching is outstanding.",
    "The explanations are very clear.",
    "The instructor is very knowledgeable.",
    "The lessons are well-structured.",
    "The teaching style is very engaging.",
    "The examples used are very relevant.",
    "The pace of teaching is just right.",
    "The feedback provided is very helpful.",
    "The teaching materials are excellent.",
    "The instructor is very approachable.",
    "The course content is very comprehensive.",
    "The teaching methods are innovative.",
    "The practical examples are very useful.",
    "The course is very interactive.",
    "The instructor is very supportive.",
    "The teaching environment is very positive.",
    "The learning experience is very enjoyable.",
    "The teaching techniques are very effective.",
    "The instructor makes complex topics easy to understand.",
    "The course is very well-organized.",
    "The instructor encourages participation.",
    "The assignments are very challenging and rewarding.",
    "The instructor is very enthusiastic.",
    "The learning resources are very helpful.",
    "The course fosters critical thinking.",
    "The instructor is very patient.",
    "The course encourages active learning.",
    "The instructor is very inspiring.",
    "The course materials are very up-to-date.",
    "The instructor promotes a growth mindset.",
    "The course encourages collaboration among students.",
    "The instructor provides timely feedback.",
    "The teaching style is very adaptable to different learning needs.",
    "The instructor is very engaging and keeps the class lively.",
    "The course content is relevant to real-world applications.",
    "The instructor uses a variety of teaching methods to cater to all students.",
    "The course promotes problem-solving skills.",
    "The instructor creates a welcoming and inclusive classroom environment.",
    "The course has a good balance of theory and practice.",
  ];

  // Function to generate responses
  function generateResponse(question) {
    const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

    let response;
    if (question.includes("like best")) {
      const positive = getRandomItem(possibleValues);
      response = `What I liked best about the course was that ${positive.toLowerCase()}`;
    } else if (question.includes("improvement")) {
      const improvement = getRandomItem(possibleValues);
      response = `The course is excellent, but ${improvement.toLowerCase()} could be improved.`;
    } else {
      const general = getRandomItem(possibleValues);
      response = `Overall, the course was very good. ${general}`;
    }

    // Truncate response to fit within the max length of the text area
    return response.length > 150
      ? response.substring(0, 147) + "..."
      : response;
  }

  // Handle text areas and check if they are filled
  const textAreaCards = document.querySelectorAll(
    ".card-content textarea[name^='OQ']"
  );
  if (textAreaCards.length === 0) {
    console.error("No text areas found with names starting with 'OQ'.");
    return;
  }

  await Promise.all(
    Array.from(textAreaCards).map(async (textArea) => {
      const questionCard = textArea.closest(".card");
      const questionText = questionCard
        ? questionCard.querySelector(".card-title").textContent.trim()
        : "";
      const response = generateResponse(questionText);
      textArea.value = response;
      textArea.dispatchEvent(new Event("change", { bubbles: true }));
      textArea.dispatchEvent(new Event("input", { bubbles: true }));
      await new Promise((resolve) => setTimeout(resolve, 100)); // small delay to make sure value is set
    })
  );

  // Check if all text areas were filled
  const allTextAreasFilled = Array.from(textAreaCards).every(
    (textarea) => textarea.value !== ""
  );
  if (!allTextAreasFilled) {
    console.error("Not all text areas were filled successfully.");
    return;
  }

  console.log("All radios checked and questions answered, Hello from Michael!");
  console.log(" This is Michael's way of being Michael :D");

  //Optional submission after filling
  const submitBtn = document.querySelector("#submitbtn");
  let userConfirmation = false;
  //Options after submit button is found
  if (submitBtn) {
    userConfirmation = confirm("Do you want to submit the form?");
    if (userConfirmation) {
      await new Promise((resolve) => setTimeout(resolve, 500)); //Delay before submission.... This is to stop potential rate limiting
      submitBtn.click();
      console.log("Form submitted successfully.");
    } else {
      console.log("Form submission cancelled by user");
    }
  } else {
    console.error("Submit button not found.");
  }

  return {
    radiosChecked: stronglyAgreeRadios.length,
    // textAreasFilled: textAreaCards.length,
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
