import React, { useEffect, useState } from "react";
import Post from "./Post";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import "./IndexPage.css";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <div className="main-content">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="all-posts">
        {posts.length > 0 && posts.map((post) => <Post {...post} />)}
      </div>
      {/* <div className="right-sidebar">
        <RightSidebar />
      </div> */}
    </div>
  );
};

export default IndexPage;
