// Quiz.js
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import quizData from "./quizData";
import "./index.css";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const shuffledQuestions = quizData.sort(() => 0.5 - Math.random()).slice(0, 5);
    const questionsWithIds = shuffledQuestions.map((question) => ({
      ...question,
      id: uuidv4(),
    }));
    setQuestions(questionsWithIds);
  }, [currentQuestionIndex]); // Run whenever currentQuestionIndex changes

  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];

    // Check if the selected answer is correct
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    // Update userAnswers state
    setUserAnswers({
      ...userAnswers,
      [currentQuestion.id]: {
        selectedAnswer,
        isCorrect,
      },
    });

    // Show feedback for a short duration
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
      // Move to the next question
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }, 1000); // Adjust the duration as needed
  };

  return (
    <div className="container">
      <h1 className="header">Quiz App</h1><hr className="hr"/>
      
      {currentQuestionIndex < questions.length ? (
        <div className="first-container">
          <h3>{questions[currentQuestionIndex].question}</h3>
          {showFeedback && (
            <p className="alert">{userAnswers[questions[currentQuestionIndex].id].isCorrect ? "Correct!" : "Wrong!"}</p>
          )}
         <div className="second-container">
            <ul className="first">
                <li><button>A</button></li>
                <li><button>B</button></li>
                <li><button>C</button></li>
                <li><button>D</button></li>

            </ul>
         <ul className="second">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => handleAnswer(option)}
                  disabled={showFeedback}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
         </div>
         
        </div>
      ) : (
        <div>
          <h3>Quiz Completed</h3>
          <p>You've answered all questions!</p>
          {/* Display overall quiz feedback, e.g., number of correct answers */}
        </div>
      )}
    </div>
  );
  
};

export default Quiz;
