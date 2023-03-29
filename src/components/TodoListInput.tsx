import { TodoContext, TodoItem } from "@/context/TodoContext";

import { ChangeEvent,  KeyboardEvent,  useContext,  useState } from "react";


const TodoListInput = () => {
  const { addTodoItem } = useContext(TodoContext);
  const [message, setMessage] = useState("");

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setMessage(event.target.value);
  }

  function onAddClick() {
    if (!message) {
      alert("Hey input can't be empty");
      return;
    }
    addTodoItem({
      message: message,
      timestamp: Date.now()
    });
    setMessage("");
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onAddClick();
    }
  }


  return (
    <div className="flex items-center">
      <input onKeyDown={handleKeyDown} value={message} onChange={onChange} placeholder="Enter Item" className="bg-sky-100 w-80 rounded-l-md border-orange-600 border-2 p-2 h-12 focus:outline-none " />
      <button  onClick={onAddClick} className="hover:shadow-md transition-shadow duration-200 shadow-black bg-orange-600 p-2 rounded-r-md text-amber-300 h-12 w-14">Add</button>
    </div>
  )
}

export default TodoListInput;