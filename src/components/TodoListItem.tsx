
import { ChangeEvent, MouseEvent, useContext } from "react";
import { TodoContext, TodoItem  } from "@/context/TodoContext";


const TodoListItem: React.FC<{  idx: number, todoListItem: TodoItem }> = ({ todoListItem, idx }) => {
  const { updateTodoItem, deleteItem } = useContext(TodoContext);

  function onCompleteClick(e: ChangeEvent<HTMLInputElement>) {
    const val = e.target.checked;
    updateTodoItem(idx, { complete: val });
  }

  function onContainerClick() {
    deleteItem(idx);
    // updateTodoItem(idx, { complete: !todoListItem.complete });
  }

  return (
    <div onClick={onContainerClick} className="hover:shadow-md transition-shadow duration-200 cursor-pointer bg-sky-100 w-72 p-3 rounded-md mb-4">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-orange-500">
          {todoListItem.message}
        </h1>
        <input onClick={(e) => e.stopPropagation()} checked={todoListItem.complete} onChange={onCompleteClick}  type="checkbox" className="h-4 w-4 accent-sky-500 focus:accent-sky-700"/>
      </div>
      <h5 className="text-gray-400 text-xs">
        {new Date(todoListItem.timestamp).toLocaleString()}
      </h5>
    </div>
  );
}

export default TodoListItem;