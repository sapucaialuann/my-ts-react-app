import { useState } from "react"

export const useQuestionHelper = (indexOfQuestions: number) => {
  const [rightAnswerCount, setRightAnswerCount] = useState(0);
  let answers = new Array(indexOfQuestions);


  const checkRightAnswer = (rightAlternative: string, selectedAlternative: string, currentIndex: number) => {
    if (rightAlternative === selectedAlternative){ 
        updateCount(true)
        answers[currentIndex] = true
        console.log(rightAlternative)
    } else updateCount(false)
  }

  const updateCount = (isRightAnswer: boolean) => {
     if (isRightAnswer) {
        setRightAnswerCount(rightAnswerCount + 1)
     }
     else if (!isRightAnswer && rightAnswerCount > 0) setRightAnswerCount(rightAnswerCount - 1)
  } 

  return {rightAnswerCount, checkRightAnswer}}
