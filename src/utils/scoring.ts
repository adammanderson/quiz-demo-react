import type { Question, ResponseMap } from "../types/quiz";

function normalizeAnswers(ans: string | string[]): string[] {
  return Array.isArray(ans) ? ans : [ans];
}

export function calculateScore(
  questions: Question[],
  responses: ResponseMap
): number {
  return questions.reduce((total, q) => {
    const user = new Set(responses[q.id] || []);
    const correct = new Set(normalizeAnswers(q.answer));

    const sameSize = user.size === correct.size;
    const allMatch = sameSize && [...user].every((a) => correct.has(a));

    return total + (allMatch ? 1 : 0);
  }, 0);
}

export function getScoreColor(pct: number): string {
  if (pct >= 80) return "bg-green-500";
  if (pct >= 50) return "bg-zinc-400";
  return "bg-red-600";
}

export function getScoreFeedback(pct: number): string {
  if (pct >= 90) return `${pct}% — you crushed it!`;
  if (pct >= 80) return `${pct}% — you did very well!`;
  if (pct >= 70) return `${pct}% — you're getting there.`;
  if (pct >= 50) return `${pct}% — a little more practice will help.`;
  return `${pct}% — you'll get it next time.`;
}

export function getQuestionPercentage(
  question: Question,
  userAnswer: string[]
): number {
  if (!userAnswer.length) return 0;
  const correctAnswers = new Set(normalizeAnswers(question.answer));
  const correctCount = userAnswer.filter((ans) =>
    correctAnswers.has(ans)
  ).length;
  return Math.round((correctCount / userAnswer.length) * 100);
}
