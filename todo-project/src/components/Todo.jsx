import React, { useEffect, useState } from "react";

const Todo = () => {
  const [text, setText] = useState("");

  //load from localstorage
  const [todo, setTodo] = useState(() => {
    return JSON.parse(localStorage.getItem("todo") || "[]");
  });

  //save to local storage
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  function handleAddButton() {
    if (text.trim() === "") return;

    setTodo([...todo, text]);
    setText("");
  }

  function handleDeleteButton(index) {
    const newTodo = [...todo];
    newTodo.splice(index, 1);
    setTodo(newTodo);
  }

  return (
    <div className="min-h-screen bg-slate-800 flex items-center justify-center ">
      <div className="h-150 border rounded-2xl bg-blue-200 p-20 flex flex-col">
        <div>
          <p className="flex justify-center mb-5 font-bold text-2xl ">
            Todo App
          </p>

          <div className="flex">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-80 border-2 rounded-full border-slate-500 px-3 placeholder-gray-400 placeholder:italic"
              placeholder="Add Todo..."
            />
            <button
              className="ml-2 px-5 py-2 bg-blue-600 text-white rounded-lg cursor-pointer"
              onClick={handleAddButton}
            >
              Add
            </button>
          </div>
        </div>
        <div className="mt-4 space-y-2 max-h-85 overflow-auto px-2">
          {todo.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white px-4 py-2 rounded-lg"
            >
              {item}
              <button
                className="ml-2 px-2 py-2 bg-red-500 text-white rounded-lg cursor-pointer "
                onClick={() => handleDeleteButton(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
