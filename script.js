const allQuestions = [
    {
        content: 'What type is Pikachu?',
        answers: ['Fire', 'Electric', 'Water', 'Grass'],
        correctAnswer: 1,
    },
    {
        content: 'Which Pokémon evolves from Charmander?',
        answers: ['Charmeleon', 'Bulbasaur', 'Squirtle', 'Pidgey'],
        correctAnswer: 0,
    },
    {
        content: 'What is the final evolution of the Water-type starter Pokémon in the Kanto region?',
        answers: ['Blastoise', 'Feraligatr', 'Empoleon', 'Swampert'],
        correctAnswer: 3,
    },
    {
        content: 'Who is known as the "God of Pokémon" in the Pokémon universe?',
        answers: ['Mew', 'Arceus', 'Dialga', 'Rayquaza'],
        correctAnswer: 1,
    },
    {
        content: 'Which Pokémon is known as the "Electric Mouse"?',
        answers: ['Pichu', 'Jolteon', 'Raichu', 'Electabuzz'],
        correctAnswer: 2,
    },
    {
        content: 'What type of move is "Thunderbolt"?',
        answers: ['Normal', 'Electric', 'Psychic', 'Fighting'],
        correctAnswer: 1,
    },
    {
        content: 'Which Pokémon is a legendary bird and represents the Fire-type in the Kanto region?',
        answers: ['Articuno', 'Moltres', 'Zapdos', 'Lugia'],
        correctAnswer: 1,
    },
    {
        content: 'How many evolutions does Eevee currently have (up to Gen 8)?',
        answers: ['Five', 'Six', 'Seven', 'Eight'],
        correctAnswer: 1,
    },
    {
        content: 'What is the name of the criminal organization in the Kanto region?',
        answers: ['Team Rocket', 'Team Magma', 'Team Aqua', 'Team Galactic'],
        correctAnswer: 0,
    },
    {
        content: 'What type of Pokémon is Mewtwo?',
        answers: ['Psychic', 'Dark', 'Fairy', 'Ghost'],
        correctAnswer: 0,
    },
];
let title = document.getElementById("title");
let context = document.getElementById("context");
let beginBtn = document.getElementById("begin-btn");
let nextBtn = document.getElementById("next-btn");
let retakeBtn = document.getElementById("retake-btn");
let question_element = document.getElementById("question");
let all_answers_element = document.getElementById("answers");
let currentIndex = 0;
let score = 0;
let selectedIndex = null;
let correctIndex = null;

//on click removes begin button and runs displayQuestion starting quiz
beginBtn.addEventListener("click", () => {
    beginBtn.style.display = "none";
    context.style.display = "none";
    question_element.style.display = "block";
    all_answers_element.style.display = "block";
    displayQuestion(allQuestions[currentIndex]);
});

//increases current index in allQuestions, hides next question w/ display: none;
//keeps score by checking correctIndex and what was selectedIndex and adding 1 if it true
//also ends the quiz with function if last question is passed  and if not runs display allQuestions
nextBtn.addEventListener("click", () => {
    if (correctIndex === selectedIndex) {
        score++;
        console.log("Score:", score);
    }
    currentIndex++;
    clearQuestion();
    nextBtn.style.display = "none";
    if (currentIndex === allQuestions.length) {
        endQuiz();
    } else {
        displayQuestion(allQuestions[currentIndex]);
    }
});

//hides retake button and resets index and score to 0 to restart quiz
// changes title from Your Finished to Take a Quiz
// shows first question with function
retakeBtn.addEventListener("click", () => {
    retakeBtn.style.display = "none";
    currentIndex = 0;
    score = 0;
    title.innerText = "Take a quiz!";
    displayQuestion(allQuestions[currentIndex]);
});

//makes correct index correct answer for this and next btn function
//displays question and answers by adding them as inner text to h3 and correct div respectively on html 
//callback function for clearhightlight so will make it so only 1 answer is highlighted
//adds highlight to clicked answer, and console logs the selection, shows next button
//121 line adds answers from loop into answers div
function displayQuestion(question) {
    correctIndex = question.correctAnswer;
    question_element.innerText = question.content;
    for (let answer of question.answers) {
        let answer_element = document.createElement("div");
        answer_element.innerText = answer;
        answer_element.addEventListener("click", () => {
            clearHighlight();
            answer_element.classList.add("highlight");
            selectedIndex = question.answers.indexOf(answer_element.innerText);
            console.log("Selected Index:", selectedIndex);
            nextBtn.style.display = "block";
        });
        all_answers_element.appendChild(answer_element);
    }
}

function clearQuestion() {
    // remove question text by removing all children until there isnt a child of answers to remove
    question_element.innerText = "";
    while (all_answers_element.firstChild) {
        all_answers_element.removeChild(all_answers_element.lastChild);
    }
}

function clearHighlight() {
    for (let answer of all_answers_element.children) {
        answer.classList.remove("highlight");
    }
}
//after next btn function reaches last index with .length this displays end screen
//with score and shows retake button
function endQuiz() {
    title.innerText = "You finished!";
    question_element.innerText = `You scored ${score}/10`;
    retakeBtn.style.display = "block";
}