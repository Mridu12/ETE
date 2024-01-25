import React, { useState } from "react";
import Editor from "../Editor";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css";

const CreatePost = () => {
  const [redirect, setRedirect] = useState(false);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [file, setFile] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  async function createNewPost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", file[0]);

    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return navigate("/");
  }
  return (
    <div className="create-post">
      
      <form onSubmit={createNewPost}>
        <input
          className="field"
          type="title"
          placeholder={"Title"}
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <input
          className="field"
          type="summary"
          placeholder={"Summary"}
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
        />
        <input
          className="field"
          type="file"
          onChange={(ev) => setFile(ev.target.files)}
        />
        <Editor value={content} onChange={setContent} />
        <button className="buttonDes2">Create Post </button>
      </form>
    </div>
  );
};

export default CreatePost;
