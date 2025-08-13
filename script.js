// Import question data from separate files
// Note: In a real server environment, you'd use dynamic imports or a bundler.
// For this single-page app in a local setup, we'll simulate loading.
// Assume these files exist in the 'questions/' directory relative to index.html
import { originalQuestions as lesson1Questions } from './questions/lesson1_questions.js';
import { originalQuestions as lesson2Questions } from './questions/lesson2_questions.js';
import { originalQuestions as lesson3Questions } from './questions/lesson3_questions.js';
import { originalQuestions as lesson4Questions } from './questions/lesson4_questions.js';
import { originalQuestions as lesson5Questions } from './questions/lesson5_questions.js';
import { originalQuestions as lesson6Questions } from './questions/lesson6_questions.js';
import { originalQuestions as lesson7Questions } from './questions/lesson7_questions.js';
import { originalQuestions as lesson8Questions } from './questions/lesson8_questions.js';
import { originalQuestions as lesson9Questions } from './questions/lesson9_questions.js';
import { originalQuestions as lesson10Questions } from './questions/lesson10_questions.js';
import { originalQuestions as lesson11Questions } from './questions/lesson11_questions.js';
import { originalQuestions as lesson12Questions } from './questions/lesson12_questions.js';
import { originalQuestions as lesson13Questions } from './questions/lesson13_questions.js';
import { originalQuestions as allLessonsQuestionsCombined } from './questions/all_lessons_questions.js';


// Mapping lesson IDs to their respective question arrays and titles/descriptions
const lessonData = {
    '1': {
        questions: lesson1Questions,
        title: "A/L ICT Lesson 01 MCQ Quizs 📚",
        description: "තොරතුරු හා සන්නිවේදන තාක්ෂණය පිළිබඳ සංකල්ප (Concept of ICT)"
    },
    '2': {
        questions: lesson2Questions,
        title: "A/L ICT Lesson 02 MCQ Quizs 🖥️",
        description: "පරිගණකය හැඳින්වීම (Introduction to Computer)"
    },
    '3': {
        questions: lesson3Questions,
        title: "A/L ICT Lesson 03 MCQ Quizs 🔢",
        description: "දත්ත නිරූපණය (Data Representation)"
    },
    '4': {
        questions: lesson4Questions,
        title: "A/L ICT Lesson 04 MCQ Quizs 🔌",
        description: "අංකිත පරිපථවල මූලිකාංග (Fundamental of Digital Circuits)"
    },
    '5': {
        questions: lesson5Questions,
        title: "A/L ICT Lesson 05 MCQ Quizs ⚙️",
        description: "පරිගණක මෙහෙයුම් පද්ධති (Computer Operating Systems)"
    },
    '6': {
        questions: lesson6Questions,
        title: "A/L ICT Lesson 06 MCQ Quizs 🌐",
        description: "දත්ත සන්නිවේදනය හා ජාලකරණය (Data Communication and Networking)"
    },
    '7': {
        questions: lesson7Questions,
        title: "A/L ICT Lesson 07 MCQ Quizs 📊",
        description: "පද්ධති විශ්ලේෂණය හා සැලසුම (Systems Analysis and Design)"
    },
    '8': {
        questions: lesson8Questions,
        title: "A/L ICT Lesson 08 MCQ Quizs 🗄️",
        description: "දත්ත සමුදාය කළමනාකරණය (Database Management)"
    },
    '9': {
        questions: lesson9Questions,
        title: "A/L ICT Lesson 09 MCQ Quizs 💻",
        description: "ක්‍රමලේඛකරණය (Programming)"
    },
    '10': {
        questions: lesson10Questions,
        title: "A/L ICT Lesson 10 MCQ Quizs 🧑‍💻",
        description: "වෙබ් අඩවි සංවර්ධනය (Web Development)"
    },
    '11': {
        questions: lesson11Questions,
        title: "A/L ICT Lesson 11 MCQ Quizs 📡",
        description: "සර්ව විසිරි අන්තර්ජාලය / සබැඳි දේවල් අන්තර්ජාලය (Internet of Things)"
    },
    '12': {
        questions: lesson12Questions,
        title: "A/L ICT Lesson 12 MCQ Quizs 💼",
        description: "ව්‍යාපාර තුළ තොරතුරු සන්නිවේදන තාක්ෂණය (ICT in Business)"
    },
    '13': {
        questions: lesson13Questions,
        title: "A/L ICT Lesson 13 MCQ Quizs 🚀",
        description: "තොරතුරු සන්නිවේදන තාක්ෂණයේ නව නැඹුරු සහ අනාගත දිශානති (New Trends and Future Directions of ICT)"
    },
    'all': {
        questions: allLessonsQuestionsCombined,
        title: "A/L ICT සම්පූර්ණ විෂය නිර්දේශය MCQ Quizs 📚",
        description: "සියලු පාඩම් වලින් අහඹු ප්‍රශ්න අඩංගුයි."
    }
};

let currentLessonId = null; // To store the currently selected lesson ID
let originalQuestionsForCurrentLesson = []; // Stores the full question set for the selected lesson

let quizQuestions = []; // This will hold the questions in their actual display order (shuffled or not)

// DOM elements
const mainMenuSection = document.getElementById('main-menu-section'); // New main menu section
const lessonButtons = document.querySelectorAll('.lesson-button'); // New lesson selection buttons

const introSection = document.getElementById('intro-section');
const startQuizButton = document.getElementById('start-quiz-button');
// Removed randomQuestionsToggle as per user request - questions will always be random
// const randomQuestionsToggle = document.getElementById('random-questions-toggle');
const introLessonTitle = document.getElementById('intro-lesson-title'); // New
const introLessonDescription = document.getElementById('intro-lesson-description'); // New
const backToMenuButtonIntro = document.getElementById('back-to-menu-button-intro'); // New

const quizSection = document.getElementById('quiz-section');
const endSummarySection = document.getElementById('end-summary-section');
const loadingSpinner = document.getElementById('loading-spinner');
const currentQuestionNumberSpan = document.getElementById('current-question-number');
const totalQuestionsSpan = document.getElementById('total-questions');
const scoreDisplay = document.getElementById('score-display');
const timerDisplay = document.getElementById('timer-display');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackMessage = document.getElementById('feedback-message');
const explanationSection = document.getElementById('explanation-section');
const explanationText = document.getElementById('explanation-text');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const endQuizButton = document.getElementById('end-quiz-button');
const restartQuizButton = document.getElementById('restart-quiz-button');
const correctAnswersCountSpan = document.getElementById('correct-answers-count');
const incorrectAnswersCountSpan = document.getElementById('incorrect-answers-count');
const unansweredFacedCountSpan = document.getElementById('unanswered-faced-count');
const attemptedQuestionsCountSpan = document.getElementById('attempted-questions-count');
const successPercentageSpan = document.getElementById('success-percentage');
const completionPercentageSpan = document.getElementById('completion-percentage');
const finalScoreSpan = document.getElementById('final-score');
const reviewQuestionsContainer = document.getElementById('review-questions-container');

const lifelineButton = document.getElementById('lifeline-button');
const lifelineCooldownDisplay = document.getElementById('lifeline-cooldown-display');
const backToMenuButtonSummary = document.getElementById('back-to-menu-button-summary'); // New

// Quiz state variables
let currentQuestionIndex = 0;
let score = 0;
// Stores user's answer, correctness, and the shuffled order of options for each question
// Structure: [{ selectedOptionIndex: number | null, isCorrect: boolean | null, shuffledOrder: [], userAnswerText: string | null, lifelineUsed: boolean, originalQuestionIndex: number, timeLeft: number }]
let userAnswers = [];
let timerInterval;
const TIME_PER_QUESTION_SECONDS = 120; // 2 minutes
const LIFELINE_COOLDOWN_SECONDS = 300; // 5 minutes (300 seconds)
let lastLifelineUseTimestamp = 0; // Timestamp when lifeline was last used

// Audio objects for sound effects
const correctSound = new Audio('./sounds/correct.mp3');
const incorrectSound = new Audio('./sounds/incorrect.mp3');
const lifelineSound = new Audio('./sounds/lifeline.mp3');

// Function to play sound
function playSound(audio) {
    audio.currentTime = 0; // Rewind to start if already playing
    audio.play().catch(e => console.error("Error playing sound:", e));
}

// Function to show loading spinner
function showLoading() {
    loadingSpinner.classList.remove('hidden');
    // Hide all other main sections
    mainMenuSection.classList.add('hidden');
    introSection.classList.add('hidden');
    quizSection.classList.add('hidden');
    endSummarySection.classList.add('hidden');
}

// Function to hide loading spinner and show quiz section
function hideLoading() {
    loadingSpinner.classList.add('hidden');
    quizSection.classList.remove('hidden');
}

// Helper function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Timer functions
function startTimer() {
    clearInterval(timerInterval); // Clear any existing timer
    let timeLeft = TIME_PER_QUESTION_SECONDS;
    const currentQuestionAnswer = userAnswers[currentQuestionIndex];

    // If question was previously visited, load remaining time if available
    if (currentQuestionAnswer && currentQuestionAnswer.timeLeft !== undefined) {
        timeLeft = currentQuestionAnswer.timeLeft;
    }

    // If question is already answered, don't run timer
    if (currentQuestionAnswer && currentQuestionAnswer.selectedOptionIndex !== null) {
        timerDisplay.textContent = formatTime(0); // Display 00:00 if answered
        return;
    }

    timerDisplay.textContent = formatTime(timeLeft);

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = formatTime(timeLeft);

        // Save time left to userAnswers for current question
        if (userAnswers[currentQuestionIndex]) {
            userAnswers[currentQuestionIndex].timeLeft = timeLeft;
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimerEnd();
        }
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function handleTimerEnd() {
    // Automatically mark question as unanswered if time runs out
    if (userAnswers[currentQuestionIndex] && userAnswers[currentQuestionIndex].selectedOptionIndex === null) {
        handleAnswerSelection(-1); // Use -1 to denote unanswered or timed out
        feedbackMessage.textContent = 'වේලාව අවසන්! පිළිතුරු දීමට නොහැකි විය. ⏱️';
        feedbackMessage.classList.remove('feedback-correct');
        feedbackMessage.classList.add('feedback-incorrect');
    }
    // Move to next question if not the last one
    if (currentQuestionIndex < quizQuestions.length - 1) {
        setTimeout(goToNextQuestion, 2000); // Wait 2 seconds before moving
    } else {
        setTimeout(endQuiz, 2000); // End quiz if last question
    }
}

// Lifeline (Remove 2 Incorrect Options) functions
function updateLifelineButton() {
    const currentTime = Date.now();
    const cooldownRemaining = Math.max(0, LIFELINE_COOLDOWN_SECONDS - Math.floor((currentTime - lastLifelineUseTimestamp) / 1000));

    if (cooldownRemaining > 0) {
        lifelineButton.disabled = true;
        lifelineCooldownDisplay.classList.remove('hidden');
        lifelineCooldownDisplay.textContent = `නැවත භාවිතා කිරීමට: ${formatTime(cooldownRemaining)}`;
        setTimeout(updateLifelineButton, 1000); // Update every second
    } else {
        lifelineButton.disabled = false;
        lifelineCooldownDisplay.classList.add('hidden');
        lifelineButton.textContent = '💡 වැරදි පිළිතුරු 2ක් ඉවත් කරන්න';
    }

    // Also disable if lifeline was already used for this question
    if (userAnswers[currentQuestionIndex] && userAnswers[currentQuestionIndex].lifelineUsed) {
        lifelineButton.disabled = true;
        lifelineCooldownDisplay.classList.remove('hidden');
        lifelineCooldownDisplay.textContent = 'මෙම ප්‍රශ්නයට දැනටමත් භාවිතා කර ඇත.';
    }
    // Disable if current question is already answered
    if (userAnswers[currentQuestionIndex] && userAnswers[currentQuestionIndex].selectedOptionIndex !== null) {
         lifelineButton.disabled = true;
         lifelineCooldownDisplay.classList.add('hidden'); // Hide countdown if answered
    }
}

function useLifeline() {
    if (lifelineButton.disabled) return;
    playSound(lifelineSound); // Play lifeline sound

    const question = quizQuestions[currentQuestionIndex];
    const currentAnswerState = userAnswers[currentQuestionIndex];

    // Only allow if no answer has been selected yet
    if (currentAnswerState.selectedOptionIndex !== null) {
        return;
    }

    // Ensure there are enough incorrect options to remove
    const incorrectOptionsOriginalIndices = currentAnswerState.shuffledOrder.filter(
        (idx) => idx !== question.correctAnswerIndex
    );

    if (incorrectOptionsOriginalIndices.length < 2) {
        // Not enough incorrect options to remove 2
        feedbackMessage.classList.remove('hidden');
        feedbackMessage.textContent = 'වැරදි පිළිතුරු 2ක් ඉවත් කිරීමට තරම් විකල්ප නැත.';
        feedbackMessage.classList.remove('feedback-correct');
        feedbackMessage.classList.add('feedback-incorrect');
        return;
    }

    // Mark lifeline as used for this question
    currentAnswerState.lifelineUsed = true;
    lastLifelineUseTimestamp = Date.now();
    updateLifelineButton(); // Start cooldown

    // Randomly select 2 incorrect options to remove
    const optionsToRemove = shuffleArray(incorrectOptionsOriginalIndices).slice(0, 2);

    // Filter out the removed options from the shuffled order
    currentAnswerState.shuffledOrder = currentAnswerState.shuffledOrder.filter(
        (idx) => !optionsToRemove.includes(idx)
    );

    // Re-render options with reduced set
    optionsContainer.innerHTML = '';
    currentAnswerState.shuffledOrder.forEach((originalIndex) => {
        const optionButton = document.createElement('button');
        optionButton.classList.add('option-button', 'w-full', 'p-4', 'border-2', 'border-gray-300', 'rounded-xl', 'text-left', 'text-gray-700', 'hover:bg-blue-50', 'focus:outline-none', 'transition-all', 'duration-200');
        optionButton.innerHTML = question.options[originalIndex]; // Use innerHTML for sup/sub
        optionButton.dataset.originalIndex = originalIndex;
        optionButton.addEventListener('click', () => handleAnswerSelection(originalIndex));
        optionsContainer.appendChild(optionButton);
    });
}


// Function to load and display a question
function loadQuestion(index) {
    showLoading(); // Show spinner temporarily, even if local data
    clearInterval(timerInterval); // Stop current timer

    setTimeout(() => { // Simulate a small delay for better UX
        hideLoading();

        currentQuestionIndex = index;
        const question = quizQuestions[currentQuestionIndex];

        currentQuestionNumberSpan.textContent = currentQuestionIndex + 1;
        totalQuestionsSpan.textContent = quizQuestions.length;
        scoreDisplay.textContent = score;
        questionText.innerHTML = question.questionText; // Use innerHTML for sup/sub

        // Remove animation classes before adding new content to reset
        questionText.classList.remove('animate-in');
        optionsContainer.classList.remove('animate-in');

        optionsContainer.innerHTML = ''; // Clear previous options
        feedbackMessage.classList.add('hidden');
        explanationSection.classList.add('hidden');

        // Ensure userAnswers[currentQuestionIndex] is initialized for the current question
        if (!userAnswers[currentQuestionIndex]) {
            // Shuffle options for the question when it's first encountered
            const shuffledIndicesForNewQuestion = shuffleArray(Array.from({ length: question.options.length }, (_, i) => i));
            userAnswers[currentQuestionIndex] = {
                selectedOptionIndex: null,
                isCorrect: null,
                shuffledOrder: shuffledIndicesForNewQuestion, // Store the shuffled order of options
                userAnswerText: null,
                lifelineUsed: false, // Initialize lifelineUsed state
                timeLeft: TIME_PER_QUESTION_SECONDS // Initialize time left
            };
        }

        // Now currentAnswerState is guaranteed to be initialized
        const currentAnswerState = userAnswers[currentQuestionIndex];
        const hasSelectedAnswerForCurrentQuestion = currentAnswerState.selectedOptionIndex !== null;

        // Add animation classes after content is updated
        questionText.classList.add('animate-in');
        optionsContainer.classList.add('animate-in');

        // If an answer was selected, show feedback and explanation immediately
        if (hasSelectedAnswerForCurrentQuestion) {
            showFeedback(currentAnswerState.isCorrect, question.options[question.correctAnswerIndex]);
            showExplanation(question.explanation);
        } else {
            // Start timer if question not answered
            startTimer();
        }

        // Use currentAnswerState.shuffledOrder for rendering options
        currentAnswerState.shuffledOrder.forEach((originalIndex) => {
            const optionButton = document.createElement('button');
            optionButton.classList.add('option-button', 'w-full', 'p-4', 'border-2', 'border-gray-300', 'rounded-xl', 'text-left', 'text-gray-700', 'hover:bg-blue-50', 'focus:outline-none', 'transition-all', 'duration-200');
            optionButton.innerHTML = question.options[originalIndex]; // Use innerHTML for sup/sub
            optionButton.dataset.originalIndex = originalIndex; // Store original index

            if (hasSelectedAnswerForCurrentQuestion) {
                // If answer was selected, disable and show correct/incorrect styling
                optionButton.disabled = true;
                if (originalIndex === currentAnswerState.selectedOptionIndex) {
                    optionButton.classList.add('selected');
                }
                if (originalIndex === question.correctAnswerIndex) {
                    optionButton.classList.add('correct');
                } else if (originalIndex === currentAnswerState.selectedOptionIndex && !currentAnswerState.isCorrect) {
                    optionButton.classList.add('incorrect');
                }
            } else {
                // If no answer selected yet, enable click listener
                optionButton.addEventListener('click', () => handleAnswerSelection(originalIndex));
            }
            optionsContainer.appendChild(optionButton);
        });

        updateNavigationButtons();
        updateLifelineButton(); // Update lifeline button state
    }, 100); // Short delay
}

// Function to handle answer selection
function handleAnswerSelection(selectedOriginalIndex) {
    clearInterval(timerInterval); // Stop timer once answer is selected

    const question = quizQuestions[currentQuestionIndex];
    const isCorrect = (selectedOriginalIndex === question.correctAnswerIndex);

    // Update userAnswers state for the current question
    userAnswers[currentQuestionIndex].selectedOptionIndex = selectedOriginalIndex;
    userAnswers[currentQuestionIndex].isCorrect = isCorrect;
    userAnswers[currentQuestionIndex].userAnswerText = (selectedOriginalIndex === -1) ? "පිළිතුරු නොදී ඇත (වේලාව අවසන්)" : question.options[selectedOriginalIndex]; // Store the text for summary

    let oldScore = score; // Store old score for animation
    // Update score based on new rules: +2 for correct, -1 for incorrect
    if (isCorrect) {
        score += 2;
        playSound(correctSound); // Play correct sound
    } else if (selectedOriginalIndex !== -1) { // Only penalize if a choice was made and it was incorrect
        score = Math.max(0, score - 1); // Ensure score does not go below 0
        playSound(incorrectSound); // Play incorrect sound
    }
    scoreDisplay.textContent = score;

    // Animate score display
    scoreDisplay.classList.remove('score-pulse', 'score-pulse-negative'); // Remove previous animation classes
    if (score > oldScore) {
        scoreDisplay.classList.add('score-pulse');
    } else if (score < oldScore) {
        scoreDisplay.classList.add('score-pulse-negative');
    }
    // Remove animation class after it completes
    scoreDisplay.addEventListener('animationend', () => {
        scoreDisplay.classList.remove('score-pulse', 'score-pulse-negative');
    }, { once: true });


    // Update UI for options
    Array.from(optionsContainer.children).forEach(button => {
        const originalIndex = parseInt(button.dataset.originalIndex);
        button.disabled = true; // Disable all options after selection
        if (originalIndex === selectedOriginalIndex) {
            button.classList.add('selected');
        }
        if (originalIndex === question.correctAnswerIndex) {
            button.classList.add('correct');
        } else if (originalIndex === selectedOriginalIndex && !isCorrect) {
            button.classList.add('incorrect');
        }
    });

    showFeedback(isCorrect, question.options[question.correctAnswerIndex]);
    showExplanation(question.explanation);
    updateNavigationButtons();
    lifelineButton.disabled = true; // Disable lifeline after answer
}

// Function to display feedback message
function showFeedback(isCorrect, correctAnswerText) {
    feedbackMessage.classList.remove('hidden');
    if (isCorrect) {
        feedbackMessage.textContent = 'නිවැරදියි! 🎉';
        feedbackMessage.classList.remove('feedback-incorrect');
        feedbackMessage.classList.add('feedback-correct');
    } else {
        feedbackMessage.innerHTML = `වැරදියි! නිවැරදි පිළිතුර: ${correctAnswerText}`; // Use innerHTML for sup/sub
        feedbackMessage.classList.remove('feedback-correct');
        feedbackMessage.classList.add('feedback-incorrect');
    }
}

// Function to display explanation
function showExplanation(explanation) {
    explanationText.innerHTML = explanation; // Use innerHTML for sup/sub
    explanationSection.classList.remove('hidden');
}

// Function to update navigation button states
function updateNavigationButtons() {
    prevButton.disabled = (currentQuestionIndex === 0);
    endQuizButton.disabled = false; // Always enabled for early exit

    // Next button is enabled ONLY if the current question has been answered AND explanation is visible
    const hasAnsweredCurrentQuestion = userAnswers[currentQuestionIndex] && userAnswers[currentQuestionIndex].selectedOptionIndex !== null;
    const isExplanationVisible = !explanationSection.classList.contains('hidden');

    nextButton.disabled = !(hasAnsweredCurrentQuestion && isExplanationVisible && currentQuestionIndex < quizQuestions.length - 1);

    // If it's the last question and answered, "Next" should be disabled, "End" should be emphasized
    if (currentQuestionIndex === quizQuestions.length - 1 && hasAnsweredCurrentQuestion) {
        nextButton.disabled = true;
        endQuizButton.classList.add('bg-blue-600', 'text-white', 'hover:bg-blue-700');
        endQuizButton.classList.remove('bg-red-500', 'text-white', 'hover:bg-red-600');
    } else {
        endQuizButton.classList.remove('bg-blue-600', 'text-white', 'hover:bg-blue-700');
        endQuizButton.classList.add('bg-red-500', 'text-white', 'hover:bg-red-600');
    }
}

// Function to go to the next question
function goToNextQuestion() {
    const hasAnsweredCurrentQuestion = userAnswers[currentQuestionIndex] && userAnswers[currentQuestionIndex].selectedOptionIndex !== null;
    if (hasAnsweredCurrentQuestion && currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
}

// Function to go to the previous question
function goToPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex); // This will re-render with past state
    }
}

// Function to end the quiz
function endQuiz() {
    clearInterval(timerInterval); // Stop any running timer
    quizSection.classList.add('hidden');
    endSummarySection.classList.remove('hidden');

    const totalQuestionsInQuiz = quizQuestions.length;
    const totalQuestionsFaced = currentQuestionIndex + 1; // Number of questions user has navigated through or seen

    const answeredQuestions = userAnswers.filter(answer => answer && answer.selectedOptionIndex !== null && answer.selectedOptionIndex !== -1);
    const correctlyAnsweredQuestions = answeredQuestions.filter(answer => answer.isCorrect).length;
    const incorrectlyAnsweredQuestions = answeredQuestions.length - correctlyAnsweredQuestions;

    const unansweredFacedQuestions = userAnswers.slice(0, totalQuestionsFaced).filter(answer => answer && (answer.selectedOptionIndex === null || answer.selectedOptionIndex === -1)).length; // Questions faced but not answered or timed out

    // Calculate percentages
    const successPercentage = answeredQuestions.length > 0 ? ((correctlyAnsweredQuestions / answeredQuestions.length) * 100).toFixed(2) : 0;
    const completionPercentage = ((totalQuestionsFaced / totalQuestionsInQuiz) * 100).toFixed(2);


    correctAnswersCountSpan.textContent = correctlyAnsweredQuestions;
    incorrectAnswersCountSpan.textContent = incorrectlyAnsweredQuestions;
    unansweredFacedCountSpan.textContent = unansweredFacedQuestions;
    attemptedQuestionsCountSpan.textContent = totalQuestionsFaced;
    successPercentageSpan.textContent = successPercentage;
    completionPercentageSpan.textContent = completionPercentage;
    finalScoreSpan.textContent = score;

    // Generate review section - only for questions that were faced (currentQuestionIndex + 1)
    reviewQuestionsContainer.innerHTML = '';
    for (let i = 0; i < totalQuestionsFaced; i++) {
        const q = quizQuestions[i]; // Use quizQuestions here
        const userAnswer = userAnswers[i];
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item', 'mb-4', 'p-4', 'rounded-xl', 'shadow-sm', 'bg-white');

        let answeredStatusText = '';

        if (userAnswer && userAnswer.selectedOptionIndex !== null && userAnswer.selectedOptionIndex !== -1) {
            // Question was answered
            if (userAnswer.isCorrect) {
                answeredStatusText = '<span class="text-green-600 font-bold"> - නිවැරදියි!</span>';
            } else {
                answeredStatusText = '<span class="text-red-600 font-bold"> - වැරදියි!</span>';
            }
        } else {
            // Question was faced but not answered or timed out
            answeredStatusText = '<span class="text-gray-500 font-bold"> - පිළිතුරු නොදී ඇත.</span>';
        }

        // Highlight correct answer in the list of options for review
        const optionsHtml = q.options.map((option, optIndex) => {
            let optionDisplayClass = '';
            if (optIndex === q.correctAnswerIndex) {
                optionDisplayClass = 'correct-answer'; // Highlight the actual correct answer
            }
            if (userAnswer && optIndex === userAnswer.selectedOptionIndex && !userAnswer.isCorrect) {
                optionDisplayClass = 'incorrect-answer'; // Highlight user's selected INCORRECT answer
            }
            // Display user's selected answer with underline
            if (userAnswer && optIndex === userAnswer.selectedOptionIndex && userAnswer.selectedOptionIndex !== -1) {
                return `<li class="ml-4 ${optionDisplayClass} user-answer-selected">${option} (ඔබේ පිළිතුර)</li>`;
            }
            return `<li class="ml-4 ${optionDisplayClass}">${option}</li>`;
        }).join('');


        resultItem.innerHTML = `
            <p class="font-semibold text-lg text-gray-800">${i + 1}. ${q.questionText} ${answeredStatusText}</p>
            <ul class="list-disc ml-6 text-gray-600 mt-2">
                ${optionsHtml}
            </ul>
            <div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-md">
                <h4 class="font-bold text-blue-700">විවරණය:</h4>
                <p class="text-gray-700">${q.explanation}</p>
            </div>
        `;
        reviewQuestionsContainer.appendChild(resultItem);
    }
}

// Function to restart the quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    clearInterval(timerInterval); // Clear any running timer
    lastLifelineUseTimestamp = 0; // Reset lifeline cooldown

    endSummarySection.classList.add('hidden');
    quizSection.classList.add('hidden'); // Ensure quiz section is hidden
    introSection.classList.remove('hidden'); // Show intro section again
}

// Function to navigate back to main menu
function backToMainMenu() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    clearInterval(timerInterval);
    lastLifelineUseTimestamp = 0;

    mainMenuSection.classList.remove('hidden');
    introSection.classList.add('hidden');
    quizSection.classList.add('hidden');
    endSummarySection.classList.add('hidden');
}


// Event Listeners for Lesson Buttons (Main Menu)
lessonButtons.forEach(button => {
    button.addEventListener('click', () => {
        const lessonId = button.dataset.lessonId;
        currentLessonId = lessonId; // Store the selected lesson ID

        const selectedLesson = lessonData[lessonId];
        if (selectedLesson) {
            originalQuestionsForCurrentLesson = [...selectedLesson.questions]; // Load questions for the selected lesson
            introLessonTitle.textContent = selectedLesson.title;
            introLessonDescription.textContent = selectedLesson.description;

            mainMenuSection.classList.add('hidden');
            introSection.classList.remove('hidden');
        } else {
            console.error("Selected lesson data not found for ID:", lessonId);
            // Fallback to main menu or show error
            backToMainMenu();
        }
    });
});


// Event Listener for Start Quiz Button (Intro Section)
startQuizButton.addEventListener('click', () => {
    // Questions are always shuffled as per user request
    quizQuestions = shuffleArray(originalQuestionsForCurrentLesson);
    totalQuestionsSpan.textContent = quizQuestions.length; // Update total questions display
    introSection.classList.add('hidden');
    loadQuestion(currentQuestionIndex);
});

// Event Listeners for Quiz Navigation and Actions
nextButton.addEventListener('click', goToNextQuestion);
prevButton.addEventListener('click', goToPreviousQuestion);
endQuizButton.addEventListener('click', endQuiz);
restartQuizButton.addEventListener('click', restartQuiz);
lifelineButton.addEventListener('click', useLifeline);

// New Event Listeners for Back to Main Menu Buttons
backToMenuButtonIntro.addEventListener('click', backToMainMenu);
backToMenuButtonSummary.addEventListener('click', backToMainMenu);

// Function to generate random color gradients for lesson buttons
function getRandomGradient() {
    const colors = [
        ['#ef4444', '#dc2626'], // Red
        ['#f97316', '#ea580c'], // Orange
        ['#eab308', '#d97706'], // Yellow
        ['#22c55e', '#16a34a'], // Green
        ['#14b8a6', '#0d9488'], // Teal
        ['#0ea5e9', '#0284c7'], // Sky
        ['#3b82f6', '#2563eb'], // Blue
        ['#a855f7', '#9333ea'], // Purple
        ['#ec4899', '#db2777'], // Pink
        ['#f43f5e', '#e11d48'], // Rose
        ['#6b7280', '#4b5563'], // Gray
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    const [color1, color2] = colors[randomIndex];
    return `linear-gradient(to bottom right, ${color1}, ${color2})`;
}

// Initial setup on window load
window.onload = function() {
    // Initially show the main menu section, hide others
    mainMenuSection.classList.remove('hidden');
    introSection.classList.add('hidden');
    quizSection.classList.add('hidden');
    endSummarySection.classList.add('hidden');
    loadingSpinner.classList.add('hidden'); // Hide spinner on initial load

    // Dynamically set random background colors for bubbles
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach(bubble => {
        const randomColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`;
        bubble.style.backgroundColor = randomColor;
    });

    // Apply random gradients to lesson buttons
    lessonButtons.forEach(button => {
        button.style.background = getRandomGradient();
    });
};
