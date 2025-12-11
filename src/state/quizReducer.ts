import type { QuizState, QuizAction, QuizData } from "../types/quiz";
import { QuizScreenState } from "../types/quiz";
import { createContext } from "react";
import type { QuizContextValue } from "../types/quiz";

export const initialState: QuizState = {
  title: "",
  description: "",
  questions: [],
  currentIndex: 0,
  totalQuestions: 0,
  responses: {},
  screenState: QuizScreenState.QUESTION,
  score: 0,
};

export function reducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "SET_QUIZ": {
      const total = action.data.questions.length;
      return {
        ...state,
        title: action.data.title,
        questions: action.data.questions,
        totalQuestions: total,
        currentIndex: 0,
        screenState: QuizScreenState.QUESTION,
      };
    }

    case "SELECT": {
      const current = state.responses[action.qid] || [];
      const updatedOptions = current.includes(action.option)
        ? current.filter((opt) => opt !== action.option)
        : [...current, action.option];

      return {
        ...state,
        responses: { ...state.responses, [action.qid]: updatedOptions },
      };
    }

    case "NEXT": {
      const nextIndex = Math.min(
        state.currentIndex + 1,
        state.questions.length - 1
      );
      return {
        ...state,
        currentIndex: nextIndex,
      };
    }

    case "PREV": {
      const prevIndex = Math.max(state.currentIndex - 1, 0);
      return {
        ...state,
        currentIndex: prevIndex,
      };
    }

    case "JUMP": {
      const nextIndex = Math.min(
        Math.max(action.index, 0),
        state.questions.length - 1
      );
      return {
        ...state,
        currentIndex: nextIndex,
        screenState: QuizScreenState.QUESTION,
      };
    }

    case "REVIEW":
      return {
        ...state,
        screenState: QuizScreenState.REVIEW,
      };

    case "SUBMIT_START":
      return {
        ...state,
        screenState: QuizScreenState.SUBMITTING,
      };

    case "SUBMIT_COMPLETE":
      return {
        ...state,
        screenState: QuizScreenState.RESULTS,
        score: action.score,
      };

    case "RESTART":
      return {
        ...state,
        currentIndex: 0,
        responses: {},
        screenState: QuizScreenState.QUESTION,
        score: 0,
      };

    default:
      return state;
  }
}

export const QuizContext = createContext<QuizContextValue | undefined>(
  undefined
);

export const actions = {
  setQuiz: (data: QuizData): QuizAction => ({
    type: "SET_QUIZ",
    data,
  }),
  select: (qid: number, option: string): QuizAction => ({
    type: "SELECT",
    qid,
    option,
  }),
  next: (): QuizAction => ({ type: "NEXT" }),
  prev: (): QuizAction => ({ type: "PREV" }),
  jump: (index: number): QuizAction => ({ type: "JUMP", index }),
  review: (): QuizAction => ({ type: "REVIEW" }),
  submitStart: (): QuizAction => ({ type: "SUBMIT_START" }),
  submitComplete: (score: number): QuizAction => ({
    type: "SUBMIT_COMPLETE",
    score,
  }),
  restart: (): QuizAction => ({ type: "RESTART" }),
};

export type { QuizAction, QuizState };
