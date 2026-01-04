import React, { useEffect, useState } from "react";

const Todo = () => {
  const [text, setText] = useState("");

  // Load from localStorage
  const [todo, setTodo] = useState(() => {
    return JSON.parse(localStorage.getItem("todo") || "[]");
  });


  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  function handleAddButton() {
    if (text.trim() === "") return;

    setTodo([...todo, { text: text.trim(), done: false }]);
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
            className="w-full sm:w-auto bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>

        <div className="flex-1 overflow-auto space-y-2 max-h-[60vh]">
          {todo.map((item, index) => (
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
                <span className={item.done ? "line-through text-gray-400" : ""}>
                  {item.text}
                </span>
              </div>

              <button
                onClick={() => handleDeleteButton(index)}
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
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
