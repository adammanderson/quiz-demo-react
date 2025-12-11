import { useReducer, useCallback, useMemo, useEffect } from "react";
import type { ReactNode } from "react";
import { quizData } from "../data";
import {
  reducer,
  initialState,
  actions as reducerActions,
} from "../state/quizReducer";
import { QuizStateContext, QuizActionsContext } from "../state/quizContext";
import { calculateScore } from "../utils";
import { QuizScreenState } from "../types/quiz";

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load quiz data once on mount
  useEffect(() => {
    dispatch(reducerActions.setQuiz(quizData));
  }, []);

  // Handle submission with delay
  useEffect(() => {
    if (state.screenState === QuizScreenState.SUBMITTING) {
      const score = calculateScore(state.questions, state.responses);
      const timer = setTimeout(() => {
        dispatch(reducerActions.submitComplete(score));
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [state.screenState, state.questions, state.responses]);

  const selectAnswer = useCallback(
    (qid: number, option: string) =>
      dispatch(reducerActions.select(qid, option)),
    []
  );
  const goNext = useCallback(() => dispatch(reducerActions.next()), []);
  const goPrev = useCallback(() => dispatch(reducerActions.prev()), []);
  const review = useCallback(() => dispatch(reducerActions.review()), []);
  const submit = useCallback(() => dispatch(reducerActions.submitStart()), []);
  const restart = useCallback(() => dispatch(reducerActions.restart()), []);
  const jumpToQuestion = useCallback(
    (index: number) => dispatch(reducerActions.jump(index)),
    []
  );

  const actions = useMemo(
    () => ({
      selectAnswer,
      goNext,
      goPrev,
      review,
      submit,
      restart,
      jumpToQuestion,
    }),
    [selectAnswer, goNext, goPrev, review, submit, restart, jumpToQuestion]
  );

  return (
    <QuizStateContext.Provider value={state}>
      <QuizActionsContext.Provider value={actions}>
        {children}
      </QuizActionsContext.Provider>
    </QuizStateContext.Provider>
  );
}
