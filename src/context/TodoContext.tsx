import { getTodoItems, postTodoItem, patchTodoItem, deleteTodoItem } from "@/services/TodoItemService";
import { createContext, ReactNode, RefObject, useEffect, useState } from "react";
import { flushSync } from "react-dom";


export interface TodoItem {
  timestamp: number;
  message: string;
  complete?: boolean;
  id?: string;
  userId?: string;
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

  async function loadData() {
    try {
    const items = await getTodoItems();
    setTodoItems(items);
    } catch(e) {
      alert("Error getting todo items");
    }
  }

  useEffect(() => {
    loadData();
  }, [])


  function saveToLocalStorage(items: TodoItem[]) {
    localStorage.setItem("todo-list", JSON.stringify(items));
  }



  async function addTodoItem(todoItem: TodoItem) {
    await postTodoItem(todoItem);
    const newTodoItems = await getTodoItems();

  
    flushSync(() => {
      setTodoItems(newTodoItems);
    })
   
    if (listElement.current) {
      listElement.current.children[0].firstElementChild?.scrollIntoView({
        behavior: "smooth",
      });
    }

  }

  async function updateTodoItem(idx: number, todoItemProps: Partial<TodoItem>) {
    const todoItem = todoItems[idx];
    if (todoItem.id) {
      await patchTodoItem(todoItem.id, todoItemProps);
      const todoItemsResponse = await getTodoItems();
      setTodoItems(todoItemsResponse);
    }
  }

  async function deleteItem(idx: number) {
    const todoItemCopy = todoItems[idx];
    if (todoItemCopy.id) {
    await deleteTodoItem(todoItemCopy.id)
    const todoItemsResponse = await getTodoItems();
    setTodoItems(todoItemsResponse);
    }
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