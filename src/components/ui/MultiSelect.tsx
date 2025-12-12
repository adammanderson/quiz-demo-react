import { memo, useMemo } from "react";
import OptionButton from "./OptionButton";

interface Props {
  options: string[];
  selected: string[];
  onSelect: (option: string) => void;
  hint?: string;
}

function MultiSelect({
  options,
  selected,
  onSelect,
  hint = "Select all that apply",
}: Props) {
  const selectedSet = useMemo(() => new Set(selected), [selected]);

  return (
    <div>
      {hint && <span className="hint block mb-2">{hint}</span>}
      <div className="space-y-2">
        {options.map((opt) => (
          <OptionButton
            key={opt}
            option={opt}
            active={selectedSet.has(opt)}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(MultiSelect);
