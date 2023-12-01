import { useEffect, useState } from "react";
import { fetchQuestions } from "../../services/api";

interface Question {
   id: string;
   required: boolean;
   title: string;
   options: string[];
   answer: string;
}

export const useQuizHelper = () => {
   const [questionsData, setQuestionsData] = useState<Question[]>([]);
   const [rightAnswersCount, setRightAnswersCount] = useState(0);
   const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
      () => Array.from({ length: questionsData.length }, () => "")
   );
   const [isFormFinished, setIsFormFinished] = useState(false);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const data = await fetchQuestions();
            setQuestionsData(data);
            setSelectedAnswers(Array.from({ length: data.length }, () => ""));
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

   return { questionsData, selectedAnswers, rightAnswersCount, handleOptionChange, checkAnswers, areAllRequiredQuestionsAnswered, isFormFinished }
}
