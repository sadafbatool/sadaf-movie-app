import React, { useEffect } from "react";
import { useGlobalContext } from "./context";
import { NavLink } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";

import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

function Movie({ title }) {
  const { movie, setPageTitle } = useGlobalContext();
  useEffect(() => {
    if (title && title.length > 0) {
      setPageTitle(title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  return (
    <>
      <section className="movie-page ">
        <div className="row">
          {" "}
          {movie &&
            movie.length > 0 &&
            movie.map((genres) => {
              const { id, title, poster_path } = genres;
              const movieName = title.substring(0, 15);
              return (
                <>
                  <div>
                    <Card
                      className="left right voilet"
                      sx={{
                        maxHeight: 645,
                      }}
                    >
                      <NavLink to={`/movie/${id}`}>
                        <h2>
                          {movieName.length >= 15
                            ? `${movieName}... `
                            : movieName}
                        </h2>
                        <CardMedia
                          className="left"
                          sx={{ height: 400 }}
                          image={`https://image.tmdb.org/t/p/original/${poster_path}`}
                        />

                        <CardActions>
                          <Button size="small">Visit Movie Information</Button>
                        </CardActions>
                      </NavLink>
                    </Card>
                  </div>
                </>
              );
            })}
        </div>
      </section>
    </>
  );
}

export default Movie;
