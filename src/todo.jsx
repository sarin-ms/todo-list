import React, { useEffect, useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState(() => {
    try {
      const storedTasks = localStorage.getItem("todo.tasks");
      return storedTasks ? JSON.parse(storedTasks) : [];
    } catch {
      return [];
    }
  });
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("todo.tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function movetaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function movetaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  return (
    <div className="app-shell">
      <div className="bg-pattern" aria-hidden="true" />

      <main className="todo-panel">
        <header className="hero">
          <h1>TODO LIST</h1>
        </header>

        <div className="composer">
          <input
            className="task-input"
            type="text"
            placeholder="What needs to get done?"
            value={newTask}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button className="btn btn-add" onClick={addTask}>
            Add Task
          </button>
        </div>

        <ol className="task-list">
          {tasks.length === 0 ? (
            <li className="empty-state"> Add your first task!</li>
          ) : (
            tasks.map((task, index) => (
              <li key={index} className="task-item">
                <span className="task-text">{task}</span>

                <div className="task-actions">
                  <button className="btn btn-delete" onClick={() => deleteTask(index)}>
                    Delete
                  </button>
                  <button
                    className="btn btn-up"
                    onClick={() => movetaskUp(index)}
                    disabled={index === 0}
                  >
                    Up
                  </button>
                  <button
                    className="btn btn-down"
                    onClick={() => movetaskDown(index)}
                    disabled={index === tasks.length - 1}
                  >
                    Down
                  </button>
                </div>
              </li>
            ))
          )}
        </ol>
      </main>
    </div>
  );
}

export default ToDoList;
