import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Movie from "./Movie";

import "./RightSidebar.css"

const RightSidebar = () => {
  const [redirect, setRedirect] = useState(false);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  if (redirect) {
    navigate("./newMovie");
  }

  useEffect(() => {
    fetch("http://localhost:4000/movie").then((response) => {
      response.json().then((movies) => {
        setMovies(movies);
      });
    });
  }, []);
  return (
    <div className="movie">
      <div className="all-movies">
      <div className="heading-rec">
        <p>Movie<br/> for the <br/>day.... </p>
      </div>
        {movies.length > 0 && movies.map((movie) => <Movie {...movie} />)}
      </div>
      <div className="butt">
        {/* <button onClick={(ev) => setRedirect(true)}>newMovie</button> */}
      </div>
    </div>
  );
};

export default RightSidebar;
