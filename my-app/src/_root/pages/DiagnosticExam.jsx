import { useState } from "react";
import { useNavigate } from "react-router-dom";
import diagnosticQuestions from "../../data/diagnosticQuestions";
import WelcomeScreen from "../../components/diagnosticExam/WelcomeScreen";
import QuestionCard from "../../components/diagnosticExam/QuestionCard";
import ResultScreen from "../../components/diagnosticExam/ResultScreen";

const assignLevel = (score) => {
  if (score <= 12)  return 0;
  if (score <= 18)  return 1;
  if (score <= 24) return 2;
  return 3;
};

const DiagnosticExam = ({ username = "Juan85", onFinish}) => {
  const [phase, setPhase]               = useState("welcome");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalScore, setTotalScore]     = useState(0);

  const handleAnswer = (value) => {
    const newScore = totalScore + value;
    const isLast   = currentIndex === diagnosticQuestions.length - 1;
    setTotalScore(newScore);
    if (isLast) {
      setPhase("result");
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  if (phase === "welcome") return (
    <div className="max-w-lg mx-auto px-6 py-8">
      <WelcomeScreen
        username={username}
        onTakeExam={() => setPhase("exam")}
      />
    </div>
  );

  if (phase === "exam") return (
    <div className="max-w-lg mx-auto px-6 py-8">
        <QuestionCard
        question={diagnosticQuestions[currentIndex]}
        current={currentIndex + 1}
        total={diagnosticQuestions.length}
        onAnswer={handleAnswer}
        />
    </div>
  );

  return (
    <div className="max-w-lg mx-auto px-6 py-8">
        <ResultScreen
        username={username}
        level={assignLevel(totalScore)}
        onContinue={() => onFinish(assignLevel(totalScore))}
        />
    </div>
  );
};

export default DiagnosticExam;