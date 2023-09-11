import React, { useContext, useEffect, useState } from "react";
const baseURL = "https://api.themoviedb.org/3";

const apiKey = process.env.REACT_APP_API_KEY;

export const trendingURL = `/trending/movie/day`;

const searchURL = `/search/keyword`;

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [movie, setMovie] = useState([]);
  const [isError, setIsError] = useState({ show: "false", msg: "" });
  const [query, setQuery] = useState("");
  const [pageTitle, setPageTitle] = useState(null);
  const [options, setOptions] = useState([]);

  const getMovies = async (url, text) => {
    try {
      await fetch(url)
        .then((response) => response.json())
        .then((res) => (text ? setOptions(res.results) : setMovie(res.results)))
        .catch(() =>
          setIsError({
            show: true,
            msg: Error,
          })
        );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (query) {
      getMovies(
        `${baseURL + searchURL}?api_key=${apiKey}&query=${query}`,
        "search"
      );
    } else if (!query && !pageTitle)
      getMovies(`${baseURL + trendingURL}?api_key=${apiKey}`);
  }, [query]);

  useEffect(() => {
    if (pageTitle) {
      getMovies(`${baseURL}/movie/${pageTitle}?api_key=${apiKey}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageTitle]);

  return (
    <AppContext.Provider
      value={{
        isError,
        movie,
        query,
        setQuery,
        setPageTitle,
        pageTitle,
        options,
        setOptions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
