import express from 'express';
import bodyParser from 'body-parser';
import { v4 } from "uuid";
import { TodoItem } from './interfaces';
import { initializeApp } from 'firebase-admin/app';
import { credential } from 'firebase-admin';

initializeApp({
  credential: credential.cert("./firebase-creds.json")
});

import { addTodoItem, getTodoItems, patchTodoItem } from './db';

const app = express();

app.use(bodyParser.json());

const port = 5000;

function createTodoItem(message: string) {
  const timestamp = Date.now();
  const id = v4();

  const todoItem: TodoItem = {
    message,
    timestamp,
    id
  }
  return todoItem;
}

app.get('/todo-items', async (req, res) => {
  try {
    const todoItems = await getTodoItems();
    res.send(todoItems);
  } catch(e) {
    console.log("ERROR getting todo items: ", e);
    res.status(400).send("Error getting todo items");
  }
})

app.patch("/todo-items", async (req, res) => {
  const body: Partial<TodoItem> = req.body;  
  const id = req.query.id;

  if (id === undefined) {
    return res.status(400).send("Bad Request");
  }

  try {
    await patchTodoItem(String(id), body);
    res.send("OK");
  } catch(e) {
    console.log("ERROr patching");
    res.status(400).send("ERROR patching todo");
  }
})

app.post("/todo-items", async (req, res) => {
  const body = req.body;
  if (!body || !body.message) {
    return res.status(400).send("LAME");
  }

  const { message } = body;
  const todoItem = createTodoItem(message);

  try {
    console.log("ADDING TODO ITEM: ", todoItem);
    await addTodoItem(todoItem);
    res.send(todoItem);
  } catch(e) {
    console.log("ERROR ADDING TODO ITEM: ", e);
    res.status(400).send("There was an error adding the todo item");
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})