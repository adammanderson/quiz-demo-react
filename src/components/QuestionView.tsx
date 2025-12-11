import { memo } from "react";
import type { Question } from "../types/quiz";
import MultiSelect from "./ui/MultiSelect";

interface Props {
  question: Question;
  selected: string[];
  onSelect: (option: string) => void;
  totalQuestions: number;
}

function QuestionView({ question, selected, onSelect, totalQuestions }: Props) {
  const countValue = `Question ${question.id} of ${totalQuestions}`;

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card">
          <span className="hint block">{countValue}</span>
          <h2 className="text-lg font-semibold mb-4">{question.question}</h2>
          {question.detail && <p>{question.detail}</p>}
        </div>

        <div className="card space-y-2">
          <MultiSelect
            options={question.options}
            selected={selected}
            onSelect={onSelect}
          />
        </div>
      </div>
    </section>
  );
}

export default memo(QuestionView);
