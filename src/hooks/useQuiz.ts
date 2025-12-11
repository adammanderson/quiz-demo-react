import { useContext } from "react";
import { QuizStateContext, QuizActionsContext } from "../state/quizContext";
import type { QuizState, QuizActions } from "../types/quiz";

export function useQuizState(): QuizState {
  const ctx = useContext(QuizStateContext);
  if (!ctx) throw new Error("useQuizState must be used within QuizProvider");
  return ctx;
}

export function useQuizActions(): QuizActions {
  const ctx = useContext(QuizActionsContext);
  if (!ctx) throw new Error("useQuizActions must be used within QuizProvider");
  return ctx;
}
