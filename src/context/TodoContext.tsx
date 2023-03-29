import { createContext, ReactNode, RefObject, useEffect, useState } from "react";
import { flushSync } from "react-dom";

export interface TodoItem {
  timestamp: number;
  message: string;
  complete?: boolean
}

export interface TodoContextI {
  todoItems: TodoItem[],
  addTodoItem(todoItem: TodoItem): void,
  updateTodoItem(idx: number, todoItemProps: Partial<TodoItem>): void,
  deleteItem(idx: number): void,
}

export const TodoContext = createContext<TodoContextI>({
  todoItems: [],
  addTodoItem(todoItem) {},
  updateTodoItem(idx, todoItemProps) {},
  deleteItem(idx) {}
});

function getCachedItems() {
  let items = localStorage.getItem("todo-list");
  if (items) {
    return JSON.parse(items);
  }
  return [];
}


const TodoContextProvider: React.FC<{ children: ReactNode, listElement: RefObject<HTMLDivElement> }> = ({ children, listElement }) => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);

  useEffect(() => {
    setTodoItems(getCachedItems());
  }, [])


  function saveToLocalStorage(items: TodoItem[]) {
    localStorage.setItem("todo-list", JSON.stringify(items));
  }



  function addTodoItem(todoItem: TodoItem) {
    const todoItemsCopy = todoItems.slice(0);
    todoItemsCopy.push(todoItem);
    
    flushSync(() => {
      setTodoItems(todoItemsCopy);
    })
   

    if (listElement.current) {
      listElement.current.children[0].firstElementChild?.scrollIntoView({
        behavior: "smooth",
      });
    }

    saveToLocalStorage(todoItemsCopy);
  }

  function updateTodoItem(idx: number, todoItemProps: Partial<TodoItem>) {
      const val = todoItems[idx];
      // val => { timestamp: 1, message: "hello", complete: false }
      // todoItemProps => { message: "hi "}
      const updated = { ...val, ...todoItemProps };
      // updated => { timestamp: 1, message: "hi", complete: false }


      const todoItemsCopy = todoItems.slice(0);
      todoItemsCopy.splice(idx, 1, updated);

      setTodoItems(todoItemsCopy);

      saveToLocalStorage(todoItemsCopy);
  }

  function deleteItem(idx: number) {
    const todoItemsCopy = todoItems.slice(0);
    todoItemsCopy.splice(idx, 1);
    setTodoItems(todoItemsCopy);
    saveToLocalStorage(todoItemsCopy);
  }

  return (
    <TodoContext.Provider value={{
      todoItems,
      addTodoItem,
      deleteItem,
      updateTodoItem
    }} >
      {children}
    </TodoContext.Provider>
  );
}


export default TodoContextProvider;