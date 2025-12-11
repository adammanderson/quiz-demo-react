import type { Question } from "../types/quiz";
import { getScoreFeedback, getScoreColor } from "../utils";
import QuestionResult from "./QuestionResult";

interface Props {
  questions: Question[];
  responses: Record<number, string[]>;
  score: number;
  onRestart: () => void;
}

export default function ResultView({ questions, responses, score }: Props) {
  const percentage = Math.round((score / questions.length) * 100);
  const scoreColor = getScoreColor(percentage);
  const feedback = getScoreFeedback(percentage);

  return (
    <div>
      <div className="grid gap-6">
        <div className="grid grid-flow-col gap-6 items-center justify-between">
          <h2 className="text-lg font-semibold">{feedback}</h2>
          <div className="flex items-center gap-2">
            <span
              className={`${scoreColor} text-white font-semibold px-2 py-2 rounded-md shadow-md`}
            >
              {score} / {questions.length}
            </span>
          </div>
        </div>
        <section>
          <div className="grid grid-cols-[2fr_1fr] gap-4 mb-2">
            <span className="hint">Questions</span>
            <span className="hint hidden md:block">Performance</span>
          </div>
          <div className="grid gap-4">
            {questions.map((q) => (
              <QuestionResult
                key={q.id}
                question={q}
                userAnswer={responses[q.id] || []}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
