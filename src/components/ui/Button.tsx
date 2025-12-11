import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({ children, className = "", ...props }: Props) {
  return (
    <button className={`button ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
