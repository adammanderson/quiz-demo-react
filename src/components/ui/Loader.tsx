import type { ReactNode } from "react";

interface Props {
  message?: ReactNode;
  size?: "sm" | "md" | "lg";
}

export default function Loader({ message, size = "sm" }: Props) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  return (
    <div className="text-center py-6">
      <div
        className={`animate-bounce rounded-full bg-blue-300 border-blue-400 border shadow-md shadow-blue-400/40 mx-auto mb-4 ${sizeClasses[size]}`}
        role="status"
        aria-label="Loading"
      />
      {message && (
        <p className="text-lg font-semibold text-zinc-700">{message}</p>
      )}
    </div>
  );
}
