import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchQuestions } from "../../services/api";

interface Question {
  id: string;
  required: boolean;
  title: string;
  options: string[];
  answer: string;
}

const Quiz: React.FC = () => {
  const [questionsData, setQuestionsData] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    Array(4).fill("")
  );
  const [rightAnswersCount, setRightAnswersCount] = useState(0);
  const [isFormFinished, setIsFormFinished] = useState(false);
  const [requiredFilled, setRequiredFilled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchQuestions();
        setQuestionsData(data);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };

    fetchData();
  }, []);

  const handleOptionChange = (
    questionIndex: number,
    selectedOption: string
  ) => {
    const newSelectedAnswers = [...selectedAnswers]; //copy of array
    newSelectedAnswers[questionIndex] = selectedOption;
    setSelectedAnswers(newSelectedAnswers); //set the copy as new array
  };

  const checkAnswers = () => {
    let count = 0;

    questionsData.forEach((question, index) => {
      if (selectedAnswers[index] === question.answer) {
        count++;
      }
    });

    setRightAnswersCount(count);
    setIsFormFinished(true);
  };

  const areAllRequiredQuestionsAnswered = () => {
    return questionsData.every(
      (question, index) => !question.required || selectedAnswers[index] !== ""
    );
  };

  return (
    <S.QuizContainer>
      {isFormFinished && (
        <S.ResultTitle>Total right Answers: {rightAnswersCount}</S.ResultTitle>
      )}
      {questionsData.map((question, questionIndex) => (
        <S.Form key={question.id}>
          <span>{question.title}</span>
          <fieldset>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <input
                  type="radio"
                  id={`q${questionIndex}_o${optionIndex}`}
                  name={`question_${question.id}`}
                  value={option}
                  checked={selectedAnswers[questionIndex] === option}
                  onChange={() => handleOptionChange(questionIndex, option)}
                />
                <label>{option}</label>
              </div>
            ))}
          </fieldset>
        </S.Form>
      ))}
      <button
        onClick={checkAnswers}
        disabled={!areAllRequiredQuestionsAnswered()}
      >
        Check Answers
      </button>
    </S.QuizContainer>
  );
};

const S = {
  QuizContainer: styled.div`
    margin: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `,
  ResultTitle: styled.h1``,
  Form: styled.form`
    width: 100%;
    text-align: left;
  `,
};

export default Quiz;
