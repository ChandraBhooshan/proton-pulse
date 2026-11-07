import React, { useState } from "react";
import "./Todo.css";

function Todo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Add a new task
  const addTask = () => {
    const trimmedTask = task.trim();

    if (!trimmedTask) return;

    setTasks((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        text: trimmedTask,
      },
    ]);

    setTask("");
  };

  // Delete individual task
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear all tasks
  const clearAll = () => {
    setTasks([]);
  };

  // Add task using Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="todo-widget">
      <h2 className="todo-title">Todo App</h2>

      {/* Input section */}
      <div className="todo-input-group">
        <input
          type="text"
          placeholder="Add your new todo"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          className="todo-add-btn"
          onClick={addTask}
          aria-label="Add task"
        >
          +
        </button>
      </div>

      {/* Task list */}
      <div className="todo-list">
        {tasks.map((item) => (
          <div className="todo-item" key={item.id}>
            <span>{item.text}</span>

            <button
              className="todo-delete-btn"
              onClick={() => deleteTask(item.id)}
              aria-label={`Delete ${item.text}`}
            >
              <span>✕</span>
            </button>
          </div>
        ))}

        {tasks.length === 0 && (
          <p className="todo-empty">No tasks yet. Add your first task!</p>
        )}
      </div>

      {/* Footer */}
      <div className="todo-footer">
        <span>
          You have <strong>{tasks.length}</strong> pending{" "}
          {tasks.length === 1 ? "task" : "tasks"}.
        </span>

        <button
          className="todo-clear-btn"
          onClick={clearAll}
          disabled={tasks.length === 0}
        >
          Clear All
        </button>
      </div>
    </div>
  );
}

export default Todo;
