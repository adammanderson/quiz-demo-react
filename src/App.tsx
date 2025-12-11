import { QuizProvider } from "./components/QuizProvider";
import QuizContainer from "./components/QuizContainer";

export default function App() {
  return (
    <QuizProvider>
      <QuizContainer />
    </QuizProvider>
  );
}
