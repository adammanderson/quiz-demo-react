import type { FC } from "react";
import { QuizScreenState } from "../types/quiz";
import { useQuizState, useQuizActions } from "../hooks/useQuiz";
import Button from "./ui/Button";

const NavControls: FC = () => {
  const { screenState, currentIndex, totalQuestions } = useQuizState();
  const { goPrev, goNext, review, submit, restart } = useQuizActions();

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  const renderRightButton = () => {
    switch (screenState) {
      case QuizScreenState.RESULTS:
        return restart ? (
          <Button onClick={restart} aria-label="Restart quiz">
            Start Over
          </Button>
        ) : null;

      case QuizScreenState.REVIEW:
        return submit ? (
          <Button onClick={submit} aria-label="Submit quiz">
            Submit Quiz
          </Button>
        ) : null;

      case QuizScreenState.SUBMITTING:
        return null;

      case QuizScreenState.QUESTION:
      default:
        if (isLast && review) {
          return (
            <Button onClick={review} aria-label="Review answers">
              Review & Submit
            </Button>
          );
        }
        if (goNext) {
          return (
            <Button onClick={goNext} aria-label="Next question">
              Next
            </Button>
          );
        }
        return null;
    }
  };

  return (
    <div className="flex justify-between gap-4 mt-4">
      {!isFirst && screenState === QuizScreenState.QUESTION ? (
        <Button onClick={goPrev} aria-label="Previous question">
          Previous
        </Button>
      ) : (
        <span className="invisible"></span>
      )}
      {renderRightButton()}
    </div>
  );
};

export default NavControls;
