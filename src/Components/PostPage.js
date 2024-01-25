import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./PostPage.css";
import { format } from "date-fns";
import { UserContext } from "./UserContext";

const PostPage = () => {
  const navigate = useNavigate();
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  if (!postInfo) return null;

  const handleDelete = () => {
    fetch(`http://localhost:4000/post/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          window.alert("Post deleted successfully");

          navigate('/')
        } else {
          throw new Error("Error deleting post");
        }
      })
      .catch((error) => {
        console.error(error);
        window.alert("An error occurred while deleting the post");
      });
  };
  return (
    <div className="post-page">
      <div className="image">
        <img src={`http://localhost:4000/${postInfo.cover}`} />
      </div>
      <h1>{postInfo.title}</h1>
      <time>
        {format(new Date(postInfo.createdAt), "MMM d, yyyy HH:mm:ss")}
      </time>
      <div className="author">by @{postInfo.author.username}</div>

      {JSON.stringify(userInfo.id) === JSON.stringify(postInfo.author._id) && (
        <div className="edit-row">
          <Link className="edit-button" to={`/edit/${postInfo._id}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            Edit This Post
          </Link>
        </div>
      )}
      {/* <div className="">{postInfo.summary}</div> */}
      <div className="content">
        <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
      </div>
      {JSON.stringify(userInfo.id) === JSON.stringify(postInfo.author._id) && (
        <div className="delete-btn">
          <button
            className="del-btn"
            onClick={() => {
              const confirmDelete = window.confirm("Are you sure you want to delete this post?");
              if (confirmDelete) {
                handleDelete();
              }
            }}
          >Delete Post</button>
        </div>
      )}

      
    </div>
  );
};

export default PostPage;