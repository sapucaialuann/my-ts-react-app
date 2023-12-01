import React from "react";
import styled from "styled-components";
import { useQuizHelper } from "./quiz.helper";

const Quiz: React.FC = () => {
  const {
    questionsData,
    selectedAnswers,
    rightAnswersCount,
    handleOptionChange,
    checkAnswers,
    areAllRequiredQuestionsAnswered,
    isFormFinished,
  } = useQuizHelper();

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
