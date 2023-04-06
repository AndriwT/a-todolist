import { TodoItem } from "@/context/TodoContext";

const DEV_BASE_URL = "http://localhost:5000";
const PROD_BASE_URL = "http://34.145.227.117:5000"
const BASE_URL = PROD_BASE_URL;


function getAuthToken() {
  return localStorage.getItem("todo-auth-token") || "";
}

export async function deleteTodoItem(id: string) {
const response = await fetch(BASE_URL + "/todo-items?id=" + id, {
  method: "DELETE",
  headers: {
    "Authorization": getAuthToken()
  }
})

if (!response.ok) {
  throw new Error("Unable to delete item")
}

}

export async function getTodoItems() {
  const response = await fetch(BASE_URL + "/todo-items", {
    headers: {
      "Authorization": getAuthToken()
    }
  });

  if (response.ok) {
    return await response.json();
  }

  if (response.status === 401) {
    window.location.href = "/login";
    return [];
  }

  throw new Error("Unable to fetch items");
}

export async function postTodoItem(todoItem: TodoItem) {
  const response = await fetch(BASE_URL + "/todo-items", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Authorization": getAuthToken()
    },
    body: JSON.stringify(todoItem)
  });

  if (!response.ok) {
    throw new Error("Unable to add item");
  }
}

export async function patchTodoItem(id: string, todoItemPartial: Partial<TodoItem>) {
  const response = await fetch(BASE_URL + "/todo-items?id=" + id, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      "Authorization": getAuthToken()
    },
    body: JSON.stringify(todoItemPartial)
  });

  if (!response.ok) {
    throw new Error("Unable to patch item");
  }
}


export {};