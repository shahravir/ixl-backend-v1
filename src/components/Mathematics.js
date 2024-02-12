import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Subjects from './Subjects'; // Import your Subjects component
import './Mathematics.css'; // Import your CSS file for styling

const Mathematics = () => {
  const [userAnswer, setUserAnswer] = useState('');
  const [result, setResult] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get('http://localhost:8080/questions');
        setQuestion(response.data);
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };

    fetchQuestion();
  }, [currentPage]);

  const handleSubmit = () => {
    // Handle user's answer submission
  };

  const handleNextQuestion = () => {
    setCurrentPage(currentPage + 1);
    setQuestion(null); // Clear the current question to trigger fetching the next one
  };

  if (!question) {
    return <div>Loading...</div>; // You can render a loading indicator while fetching the question
  }

  return (
    <div className="mathematics-page">
      <h2>Mathematics Quiz</h2>
      <div className="question-container">
        <p className="question-text">{question.question_text}</p>
      </div>
      {/* Render answer options or input field based on question type */}
      <div className="answer-input">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Enter your answer"
        />
        <button className="next-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <div className="result">
        {result && <p>{result}</p>}
      </div>
      <button className="next-button" onClick={handleNextQuestion}>
        Next Question
      </button>
    </div>
  );
};

export default Mathematics;
