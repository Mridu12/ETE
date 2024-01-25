import "./App.css";
import Header from "./Components/Header";
import IndexPage from "./Components/IndexPage";
import Layout from "./Components/Layout";
import LoginPage from "./Components/LoginPage";
import Post from "./Components/Post";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import { UserContextProvider } from "./Components/UserContext";
import CreatePost from "./Components/CreatePost";
import PostPage from "./Components/PostPage";
import EditPost from "./Components/EditPost";
import NewMovie from "./Components/NewMovie";

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/create"} element={<CreatePost />} />
            <Route path={"/post/:id"} element={<PostPage />} />
            <Route path={"/edit/:id"} element={<EditPost />} />
            <Route path={"/newMovie"} element={<NewMovie />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
