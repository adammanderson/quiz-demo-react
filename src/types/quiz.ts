export interface Question {
  id: number;
  question: string;
  detail?: string;
  options: string[];
  answer: string[];
}

export interface QuizData {
  title: string;
  questions: Question[];
}

export type ResponseMap = Record<number, string[]>;

export const QuizScreenState = {
  QUESTION: "question",
  REVIEW: "review",
  SUBMITTING: "submitting",
  RESULTS: "results",
} as const;

export type QuizScreenState =
  (typeof QuizScreenState)[keyof typeof QuizScreenState];

export interface QuizState {
  title: string;
  description: string;
  questions: Question[];
  currentIndex: number;
  totalQuestions: number;
  responses: ResponseMap;
  screenState: QuizScreenState;
  score: number;
}

export type QuizAction =
  | { type: "SELECT"; qid: number; option: string }
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "JUMP"; index: number }
  | { type: "REVIEW" }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_COMPLETE"; score: number }
  | { type: "RESTART" }
  | { type: "SET_QUIZ"; data: QuizData };

export interface QuizActions {
  selectAnswer: (qid: number, option: string) => void;
  goNext: () => void;
  goPrev: () => void;
  jumpToQuestion: (index: number) => void;
  review: () => void;
  submit: () => void;
  restart: () => void;
}

export type QuizContextValue = QuizState & QuizActions;
