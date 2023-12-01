const apiUrl = "https://654ddc41cbc325355741f9b5.mockapi.io/api/v1/questions";

export const fetchQuestions = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
      });
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching questions:", error);
      throw error;
    }
  };