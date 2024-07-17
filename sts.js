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

  // Function to generate Responses
  function generateResponse(question) {
    //function to get randomItems form possibleValues array
    const getRandomItems = (arr, num) => {
      const shuffled = arr.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, num);
    };

    //return response passed on question content
    if (question.includes("like best")) {
      const positives = getRandomItems(possibleValues, 3);

      return `What I liked best about the course was that ${
        positives[0]
      } Additionally, ${positives[1].toLowerCase()} Moreover, ${positives[2].toLowerCase()}`;
    } else if (question.includes("improvement")) {
      const improvements = getRandomItems(possibleValues, 2);

      return `While the course is excellent overall, there's always room for improvement. Perhaps ${improvements[0].toLowerCase()} could be further enhanced. Additionally, it might be beneficial if ${improvements[1].toLowerCase()}`;
    } else {
      const general = getRandomItems(possibleValues, 3);

      return `Overall, the course was very informative and well-delivered. ${
        general[0]
      } Furthermore, ${general[1].toLowerCase()} Lastly, ${general[2].toLowerCase()}`;
    }
  }

  //Handle text areas and check if they are filled
  const textAreaCards = document.querySelectorAll(
    ".card-content textarea[name^='OQ']"
  );

  let filledTextAreas = 0;

  textAreaCards.forEach((textArea) => {
    //get text card anf question
    const questionCard = textArea.closest(".card");
    const questionText = questionCard
      .querySelector(".card-title")
      .textContent.trim();

    //Respond and set textArea value
    const response = generateResponse(questionText);
    textArea.value = response;
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
