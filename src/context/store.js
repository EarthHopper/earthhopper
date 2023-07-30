import { useState, useContext, createContext, useEffect } from "react";

const StateContext = createContext();

export function StateProvider({ children }) {
  const [response, setResponseState] = useState(null);

  const sortRecommendationsByStartTime = (recommendations) => {
    return recommendations.sort((a, b) => {
      const timeA = new Date(`1970-01-01T${a.start_time}`);
      const timeB = new Date(`1970-01-01T${b.start_time}`);
      return timeA - timeB;
    });
  };

  const setResponse = (data) => {
    const sortedRecommendations = sortRecommendationsByStartTime(
      data.recommendations
    );
    setResponseState({ ...data, recommendations: sortedRecommendations });
    window.localStorage.setItem(
      "response",
      JSON.stringify({ ...data, recommendations: sortedRecommendations })
    );
  };

  const removeResponse = () => {
    window.localStorage.removeItem("response");
    window.location.reload();
  };

  useEffect(() => {
    const responseLocalStorage = window.localStorage.getItem("response");
    if (responseLocalStorage) {
      setResponseState(JSON.parse(responseLocalStorage));
    }
  }, []);

  return (
    <StateContext.Provider value={{ response, setResponse, removeResponse }}>
      {children}
    </StateContext.Provider>
  );
}

export function useStateContext() {
  return useContext(StateContext);
}
