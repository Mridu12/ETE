import { useContext, useEffect} from "react";
import { UserContext } from "./UserContext";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const { setUserInfo, userInfo } = useContext(UserContext);
  
  function logoutUser() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo({});
    navigate("/");
  }

  const username = userInfo?.username;
  const blogText = username ? `${username}'s Blogs` : "All blogs";
  useEffect(() => {
    if (username) {
      fetch("http://localhost:4000/profile", {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((userInfo) => {
          setUserInfo(userInfo);
        });
    }
  }, [username, setUserInfo]);

  console.log(userInfo);
  return (
    <header>
      <Link to="/" className="logo">
        {blogText}
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create New Post</Link>
            <a to="/" onClick={logoutUser}>
              Logout
            </a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
