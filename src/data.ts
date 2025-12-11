import rawQuizData from "../questions.json";
import type { Question, QuizData } from "./types/quiz";

export const quizData: QuizData = {
  title: rawQuizData.title,
  questions: rawQuizData.questions.map(
    (question: Question): Question => ({
      ...question,
      answer: Array.isArray(question.answer)
        ? question.answer
        : [question.answer],
    })
  ),
};
