// questions/all_lessons_questions.js
// Import questions from all individual lesson files
import { originalQuestions as lesson1 } from './lesson1_questions.js';
import { originalQuestions as lesson2 } from './lesson2_questions.js';
import { originalQuestions as lesson3 } from './lesson3_questions.js';
import { originalQuestions as lesson4 } from './lesson4_questions.js';
import { originalQuestions as lesson5 } from './lesson5_questions.js';
import { originalQuestions as lesson6 } from './lesson6_questions.js';
import { originalQuestions as lesson7 } from './lesson7_questions.js';
import { originalQuestions as lesson8 } from './lesson8_questions.js';
import { originalQuestions as lesson9 } from './lesson9_questions.js';
import { originalQuestions as lesson10 } from './lesson10_questions.js';
import { originalQuestions as lesson11 } from './lesson11_questions.js';
import { originalQuestions as lesson12 } from './lesson12_questions.js';
import { originalQuestions as lesson13 } from './lesson13_questions.js';
import { originalQuestions as lesson14 } from './lesson14_questions.js';


// Combine all questions into one array
export const originalQuestions = [
    ...lesson1,
    ...lesson2,
    ...lesson3,
    ...lesson4,
    ...lesson5,
    ...lesson6,
    ...lesson7,
    ...lesson8,
    ...lesson9,
    ...lesson10,
    ...lesson11,
    ...lesson12,
    ...lesson13,
    ...lesson14
    // Add more questions directly if needed, or ensure all individual lesson files are imported and spread here
];
