import { createContext } from "react";
import type { QuizState, QuizActions } from "../types/quiz";

export const QuizStateContext = createContext<QuizState | undefined>(undefined);
export const QuizActionsContext = createContext<QuizActions | undefined>(
  undefined
);
