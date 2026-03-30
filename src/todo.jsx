import React, { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

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
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-center text-6xl font-bold mb-6">TODO LIST</h1>

      <div className="flex items-center gap-2 mb-6">
        <input
          className="border border-gray-700 p-2 rounded"
          type="text"
          placeholder="Enter a task"
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="border border-gray-700 p-2 rounded" onClick={addTask}>
          Add
        </button>
      </div>

      <ol className="space-y-2">
        {tasks.map((task, index) => (
          <li key={index}>
            <span>{task}</span>
            <button
              className="border border-gray-700 ml-2 mr-2 p-2"
              onClick={() => deleteTask(index)}
            >
              Delete
            </button>
            <button
              className="border border-gray-700 ml-2 mr-2 p-2"
              onClick={() => movetaskUp(index)}
            >
              Up
            </button>
            <button
              className="border border-gray-700 ml-2 mr-2 p-2"
              onClick={() => movetaskDown(index)}
            >
              Down
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
