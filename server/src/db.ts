import { getFirestore } from 'firebase-admin/firestore'
import { TodoItem } from './interfaces';

const db = getFirestore();


export async function addTodoItem(todoItem: TodoItem) {
  await db.collection('todo-items').doc(todoItem.id).set(todoItem);
}

export async function getTodoItems() {
  const ref = db.collection("todo-items");
  const snapshots = await ref.get();
  const docs = snapshots.docs;
  return docs.map(doc => doc.data());
}

export async function patchTodoItem(id: string, partialTodo: Partial<TodoItem>) {
  await db.collection("todo-items").doc(id).update(partialTodo);
}