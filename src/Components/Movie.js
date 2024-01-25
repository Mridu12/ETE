import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";


import "./RightSidebar.css"

const Movie = ({
  _id,
  movieTitle,
  summary,
  coverPhoto,
  imdb,
  createdAt,
  author,
}) => {
  return (
    <div className="movie">
      <div className="entry">
        <div className="image">
          {/* <Link to={`/post/${_id}`}> */}
            <img className="movie-image" src={`http://localhost:4000/${coverPhoto}`} alt="temp" />
          {/* </Link> */}
        </div>
        <div className="content">
          <Link to={`/post/${_id}`}>
            <h2>{movieTitle}</h2>
          </Link>
          <p className="info">
            <a className="author">{author.username}</a>
            <time>{format(new Date(createdAt), "MMM d, yyyy HH:mm:ss")}</time>
          </p>
          <p>imdb : {imdb}</p>
          <p dangerouslySetInnerHTML={{ __html: summary }}></p>
        </div>
      </div>
    </div>
  );
};

export default Movie;
