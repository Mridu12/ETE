// Sidebar.js

import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import "./Sidebar.css";

const Sidebar = () => {
  const { userInfo } = useContext(UserContext);
  const { username } = userInfo;

  const [quoteData, setQuoteData] = useState([]);
  const [userNote, setUserNote] = useState("");
  const [preferences, setPreferences] = useState({ darkMode: false });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [todoList, setTodoList] = useState([]);

  const fetchRandomQuote = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      setQuoteData([data]);
    } catch (error) {
      console.error("Error fetching random quote:", error);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleNoteChange = (event) => {
    setUserNote(event.target.value);
  };

  const handleNoteSubmit = () => {
    console.log("Note submitted:", userNote);
    setUserNote("");
  };

  const toggleDarkMode = () => {
    setPreferences((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const handleAddTodo = (todo) => {
    setTodoList((prevList) => [...prevList, todo]);
  };

  const handleRemoveTodo = (index) => {
    setTodoList((prevList) => prevList.filter((_, i) => i !== index));
  };

  return (
    <div className={`sidebar-container ${preferences.darkMode ? 'dark-mode' : ''}`}>
      <div className="user-info">
        {username && (
          <div className="welcome-message">
            Welcome, {username}, to the Grimoire of Words
          </div>
        )}
      </div>

      <div className="quote-section">
        <h2>Random Quote</h2>
        <table className="random-quote-table">
          <tbody>
            {quoteData.map((quote) => (
              <React.Fragment key={quote._id}>
                <tr>
                  <td>{quote.content}</td>
                </tr>
                <tr>
                  <td className="quote-author">{quote.author}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="clock-section">
        <h2>Current Time</h2>
        <p>{currentTime.toLocaleTimeString()}</p>
      </div>

      <div className="user-note-section">
        <h2>Your Note</h2>
        <textarea
          value={userNote}
          onChange={handleNoteChange}
          placeholder="Add your note here..."
          rows={5}
        />
        <button onClick={handleNoteSubmit}>Submit</button>
      </div>

      <div className="todo-section">
        <h2>To Read List</h2>
        <ul>
          {todoList.map((todo, index) => (
            <li key={index}>
              {todo}
              <button onClick={() => handleRemoveTodo(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Add a new todo"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value.trim() !== "") {
              handleAddTodo(e.target.value.trim());
              e.target.value = "";
            }
          }}
        />
      </div>

      <div className="preferences-section">
        <h2>Preferences</h2>
        <label>
          Dark Mode
          <input
            type="checkbox"
            checked={preferences.darkMode}
            onChange={toggleDarkMode}
          />
        </label>
      </div>

      <div className="resources-section">
        <h2>External Resources</h2>
        <ul>
          <li>
            <a href="https://example.com" target="_blank" rel="noopener noreferrer">
              YOU-TUBE
            </a>
          </li>
          <li>
            <a href="https://example.com" target="_blank" rel="noopener noreferrer">
              ANIWATCH
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
