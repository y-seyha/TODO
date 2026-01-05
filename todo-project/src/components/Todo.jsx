import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";

const Todo = () => {
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState("all");
  // Load from localStorage
  const [todo, setTodo] = useState(() => {
    return JSON.parse(localStorage.getItem("todo") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  function handleAddButton() {
    if (text.trim() === "") return;

    setTodo([
      ...todo,
      {
        text: text.trim(),
        done: false,
        createAt: new Date().toISOString(),
      },
    ]);
    setText("");
  }

  function handleDeleteButton(index) {
    const newTodo = [...todo];
    newTodo.splice(index, 1);
    setTodo(newTodo);
  }

  function toggleDone(index) {
    const newTodo = [...todo];
    newTodo[index].done = !newTodo[index].done;
    setTodo(newTodo);
  }

  function handleClearButton() {
    if (window.confirm("Are you sure you want to clear all todos?")) {
      setTodo([]);
    }
  }

  function startEdit(index) {
    setEditIndex(index);
    setEditText(todo[index].text);
  }

  function saveEdit(index) {
    const newTodo = [...todo];
    newTodo[index].text = editText.trim() || newTodo[index].text;
    setTodo(newTodo);
    setEditIndex(null);
    setEditText("");
  }

  const filterTodo = todo.filter((item) => {
    if (filter === "active") return !item.done;
    if (filter === "completed") return item.done;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-800 p-4">
      <div className="mt-5 w-full max-w-md mx-auto bg-blue-200 rounded-2xl flex flex-col p-6 md:p-10">
        <p className="text-xl sm:text-2xl font-bold mb-4 text-center">
          Todo App
        </p>

        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") handleAddButton();
            }}
            placeholder="Add Todo..."
            className="w-full sm:flex-1 border-2 border-slate-500 rounded-full px-3 py-2 placeholder-gray-400 placeholder:italic"
          />
          <button
            onClick={handleAddButton}
            className="w-full sm:w-auto bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Add
          </button>
          <button
            onClick={() => handleClearButton()}
            className="w-full sm:w-auto bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition cursor-pointer"
          >
            Clear All
          </button>
        </div>

        <div className="flex justify-center gap-2 mb-4">
          {["all", "active", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg ${
                filter === f ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-auto space-y-2 max-h-[60vh]">
          {[...filterTodo]
            .sort((a, b) => new Date(a.createAt) - new Date(b.createAt))
            .map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white px-4 py-2 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => toggleDone(index)}
                  />

                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveEdit(index);
                      }}
                      className="border-b border-gray-400 px-1 py-1 focus:outline-none"
                      autoFocus
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <span
                        className={item.done ? "line-through text-red-400" : ""}
                      >
                        {item.text}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(
                          item.createAt || item.createdAt
                        ).toLocaleDateString("en-GB")}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  {editIndex === index ? (
                    <FaCheck
                      className="text-green-600 cursor-pointer"
                      onClick={() => saveEdit(index)}
                    />
                  ) : (
                    <FaEdit
                      className="text-blue-600 cursor-pointer"
                      onClick={() => startEdit(index)}
                    />
                  )}
                  <FaTrash
                    className="text-red-600 cursor-pointer"
                    onClick={() => handleDeleteButton(index)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
