import type { Question, ResponseMap } from "../types/quiz";

interface Props {
  questions: Question[];
  responses: ResponseMap;
  onEdit: (index: number) => void;
}

export default function ReviewView({ questions, responses, onEdit }: Props) {
  const answeredCount = Object.keys(responses).length;
  const totalCount = questions.length;

  return (
    <div>
      <div className="grid gap-6">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Review Your Answers</h2>
          <p className="text-sm text-zinc-600">
            You've answered {answeredCount} of {totalCount} questions
          </p>
        </div>

        <section>
          <div className="grid gap-4">
            {questions.map((q, idx) => {
              const userAnswer = responses[q.id] || [];
              const hasAnswer = userAnswer.length > 0;

              return (
                <div
                  key={q.id}
                  className={`card p-4 grid sm:grid-cols-[1fr_auto] items-start justify-between gap-4 ${
                    !hasAnswer && "border-red-300 bg-red-50"
                  }`}
                >
                  <div>
                    <p className="font-semibold mb-2">
                      Question {q.id}: {q.question}
                    </p>
                    <p className="text-sm text-zinc-700">
                      {hasAnswer
                        ? `${userAnswer.join(", ")}`
                        : "No answer provided."}
                    </p>
                  </div>
                  <button
                    className="button shrink-0 text-sm"
                    onClick={() => onEdit(idx)}
                    aria-label="Edit"
                  >
                    Edit
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
