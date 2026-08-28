import { useState, useEffect } from "react";
import Button from "../components/common/Button.jsx";

// The backend runs on a different port (3001) than the frontend (5173),
// so we need the full URL. Later you could move this into a .env file.

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newText, setNewText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Runs once when the component first mounts — fetches the initial list.
  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      setLoading(true);
      const res = await fetch("api/todo-tutorial");
      if (!res.ok) throw new Error("Failed to load todos");
      const data = await res.json();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function addTodo(e) {
    e.preventDefault(); // stop the form from reloading the page
    if (!newText.trim()) return;

    try {
      const res = await fetch("api/todo-tutorial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newText }),
      });
      if (!res.ok) throw new Error("Failed to add todo");
      const created = await res.json();
      setTodos((prev) => [...prev, created]);
      setNewText("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function toggleTodo(todo) {
    try {
      const res = await fetch(`api/todo-tutorial/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: !todo.done }),
      });
      if (!res.ok) throw new Error("Failed to update todo");
      const updated = await res.json();
      setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteTodo(id) {
    try {
      const res = await fetch(`api/todo-tutorial/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete todo");
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="app">
      <h1>Todo Tutorial App</h1>
      <p className="subtitle">React frontend + Node/Express backend</p>

      <form onSubmit={addTodo} className="add-form">
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="What needs doing?"
        />
        <button type="submit">Add</button>
      </form>

      {error && <p className="error">⚠ {error}</p>}
      {loading ? (
        <p>Loading…</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.done ? "done" : ""}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo)}
                />
                {todo.text}
              </label>
              <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
