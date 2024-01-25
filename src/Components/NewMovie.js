import React, { useState,useEffect } from "react";
import Editor from "../Editor";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import Movie from "./Movie";
import "./RightSidebar.css"

const NewMovie = () => {
  const [redirect, setRedirect] = useState(false);
  const [movieTitle, setMovieTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [imdb, setImdb] = useState("");
  const [file, setFile] = useState("");
  const navigate = useNavigate();

  
  async function createNewMovie(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("movieTitle", movieTitle);
    data.set("summary", summary);
    data.set("imdb", imdb);
    data.set("file", file[0]);

    const response = await fetch("http://localhost:4000/movie", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }
  if (redirect) {
    navigate("./");
  }
  
  return (
    <div className="create-movie-content">
      


      <form onSubmit={createNewMovie}>
        <input
          className="field"
          type="title"
          placeholder={"movie title"}
          value={movieTitle}
          onChange={(ev) => setMovieTitle(ev.target.value)}
        />
        
        <input
          className="field"
          type="imdb"
          placeholder={"Imdb Ratings"}
          value={imdb}
          onChange={(ev) => setImdb(ev.target.value)}
        />
        <input
          className="field"
          type="file"
          onChange={(ev) => setFile(ev.target.files)}
        />
        <Editor value={summary} onChange={setSummary} />
        <button className="buttonDes2">Create Post </button>
      </form>
    </div>
  );
};

export default NewMovie;
