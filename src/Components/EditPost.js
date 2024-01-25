import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import Editor from "../Editor";

const EditPost = () => {
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [file, setFile] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
    });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id",id);
    if (file?.[0]) {
      data.set("file", file?.[0]);
    }
    const response = await fetch(`http://localhost:4000/post/`, {
      method: "PUT",
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return navigate("/post/" + id);
  }
  return (
    <form onSubmit={updatePost}>
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
      <button className="buttonDes2">Update Post </button>
    </form>
  );
};

export default EditPost;
