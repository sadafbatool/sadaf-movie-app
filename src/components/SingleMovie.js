import React from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

const baseURL = "https://api.themoviedb.org/3";

const apiKey = process.env.REACT_APP_API_KEY;

function SingleMovie() {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState({});
  console.log(movie);
  const getMovies = async (url) => {
    try {
      await fetch(url)
        .then((response) => response.json())
        .then((res) => {
          setMovie(res);
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies(`${baseURL}/movie/${id}?api_key=${apiKey}&i=${id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <div className="blue">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      ) : (
        <div className="blue red">
          <br />
          <div>
            <img
              className="blue red width"
              src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
              alt="Movies Images"
            />
            <div className="green">
              <br />
              Title :{movie?.title}
              <br />
              Realease Date: {movie?.release_date}
              <br />
              {movie?.tagline}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleMovie;
