import { getQuestionPercentage, getScoreColor } from "../utils";
import type { Question } from "../types/quiz";

interface Props {
  question: Question;
  userAnswer: string[];
}

export default function QuestionResult({ question, userAnswer }: Props) {
  const percentage = getQuestionPercentage(question, userAnswer);
  const barColor = getScoreColor(percentage);
  return (
    <div className="card p-4 grid md:grid-cols-[2fr_1fr] gap-4 md:gap-6 items-center">
      <p className="font-semibold">{question.question}</p>
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full ${barColor} transition-all duration-300`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
