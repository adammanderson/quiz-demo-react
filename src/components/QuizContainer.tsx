import QuestionView from "./QuestionView";
import ReviewView from "./ReviewView";
import ResultView from "./ResultView";
import NavControls from "./NavControls";
import { useQuizState, useQuizActions } from "../hooks/useQuiz";
import { QuizScreenState } from "../types/quiz";
import Loader from "./ui/Loader";

export default function QuizContainer() {
  const {
    title,
    questions,
    currentIndex,
    responses,
    screenState,
    score,
    totalQuestions,
  } = useQuizState();

  const { selectAnswer, restart, jumpToQuestion } = useQuizActions();

  if (questions.length === 0) return <div>Loading...</div>;

  const activeQuestion = questions[currentIndex];
  const selected = responses[activeQuestion.id] ?? [];

  const renderScreen = () => {
    switch (screenState) {
      case QuizScreenState.SUBMITTING:
        return (
          <div className="pt-6">
            <Loader message="Calculating your score" />
          </div>
        );

      case QuizScreenState.RESULTS:
        return (
          <ResultView
            questions={questions}
            responses={responses}
            score={score}
            onRestart={restart}
          />
        );

      case QuizScreenState.REVIEW:
        return (
          <ReviewView
            questions={questions}
            responses={responses}
            onEdit={(idx) => jumpToQuestion(idx)}
          />
        );

      default:
        return (
          <QuestionView
            question={activeQuestion}
            selected={selected}
            totalQuestions={totalQuestions}
            onSelect={(opt) => selectAnswer(activeQuestion.id, opt)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="card md:max-w-2xl">
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        {renderScreen()}
        <NavControls />
      </div>
    </div>
  );
}
