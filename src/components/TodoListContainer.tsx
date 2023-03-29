
import { RefObject, useContext, useRef } from "react";
import TodoListItem from "./TodoListItem";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { TodoContext, TodoItem  } from "@/context/TodoContext";



const TodoListContainer: React.FC<{  listContainer: RefObject<HTMLDivElement> }> = ({  listContainer }) => {
  const { todoItems } = useContext(TodoContext);
const [animationParent] = useAutoAnimate();

  return (
    <div ref={listContainer}>
    <div ref={animationParent} className="h-80 overflow-scroll mt-4">
      {todoItems.map((todoItem, idx) => (
        <TodoListItem key={todoItem.timestamp} idx={idx} todoListItem={todoItem} />
      ))}
    </div>
    </div>

  );
}

export default TodoListContainer;