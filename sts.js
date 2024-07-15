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
  "The course has a good balance of theory and practice."
];

  
  // Fill in textareas
  for (let i = 1; i <= 4; i++) {
    const textarea = document.querySelector(`.card-content textarea[name='OQ${i}']`);
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
