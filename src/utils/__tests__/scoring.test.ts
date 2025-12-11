import { describe, it, expect } from "vitest";
import type { Question, ResponseMap } from "../../types/quiz";
import {
  calculateScore,
  getScoreColor,
  getScoreFeedback,
  getQuestionPercentage,
} from "../scoring";

const questions: Question[] = [
  {
    id: 1,
    question: "Select all correct letters",
    options: ["A", "B", "C", "D"],
    answer: ["A", "C"],
  },
  {
    id: 2,
    question: "Yes or No?",
    options: ["Yes", "No"],
    answer: ["Yes"],
  },
  {
    id: 3,
    question: "Pick the correct pair",
    options: ["W", "X", "Y", "Z"],
    answer: ["X", "Y"],
  },
];

describe("scoring utils", () => {
  it("awards a point only for exact matches (order-insensitive)", () => {
    const responses: ResponseMap = {
      1: ["C", "A"], // exact match, different order
      2: ["Yes"], // exact match
      3: ["X"], // partial -> should not score
    };
    const score = calculateScore(questions, responses);
    expect(score).toBe(2);
  });

  it("does not award points when there are extra or missing selections", () => {
    const responses: ResponseMap = {
      1: ["A", "B", "C"], // extra "B"
      2: ["False"], // wrong
      3: [], // unanswered
    };
    const score = calculateScore(questions, responses);
    expect(score).toBe(0);
  });

  it("getScoreColor returns the expected class by threshold", () => {
    expect(getScoreColor(85)).toBe("bg-green-500");
    expect(getScoreColor(80)).toBe("bg-green-500");
    expect(getScoreColor(50)).toBe("bg-zinc-400");
    expect(getScoreColor(79)).toBe("bg-zinc-400");
    expect(getScoreColor(49)).toBe("bg-red-600");
  });

  it("getScoreFeedback returns sensible messages across bands", () => {
    expect(getScoreFeedback(92)).toMatch(/crushed it/i);
    expect(getScoreFeedback(85)).toMatch(/very well/i);
    expect(getScoreFeedback(72)).toMatch(/getting there/i);
    expect(getScoreFeedback(55)).toMatch(/practice/i);
    expect(getScoreFeedback(12)).toMatch(/next time/i);
  });

  it("getQuestionPercentage is based on fraction of selected answers that are correct", () => {
    // For q1 correct answers are A and C
    expect(getQuestionPercentage(questions[0], ["A", "B", "C"])).toBe(67); // 2/3 ~ 66.7 -> 67
    expect(getQuestionPercentage(questions[0], ["A", "C"])).toBe(100);
    expect(getQuestionPercentage(questions[0], ["B", "D"])).toBe(0);
    expect(getQuestionPercentage(questions[0], [])).toBe(0);
  });

  it("supports questions with a single-string correct answer", () => {
    expect(getQuestionPercentage(questions[1], ["Yes"])).toBe(100);
    expect(getQuestionPercentage(questions[1], ["No"])).toBe(0);
  });
});
