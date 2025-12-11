import React, { memo } from "react";

interface Props {
  option: string;
  active: boolean;
  onSelect: (opt: string) => void;
}

const OptionButton: React.FC<Props> = memo(function OptionButton({
  option,
  active,
  onSelect,
}) {
  return (
    <button
      onClick={() => onSelect(option)}
      aria-pressed={active}
      className={`option ${active ? "option-selected" : ""}`}
    >
      {option}
    </button>
  );
});

export default OptionButton;
