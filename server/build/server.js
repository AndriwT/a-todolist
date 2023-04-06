"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const uuid_1 = require("uuid");
const app_1 = require("firebase-admin/app");
const firebase_admin_1 = require("firebase-admin");
(0, app_1.initializeApp)({
    credential: firebase_admin_1.credential.cert("./firebase-creds.json")
});
const db_1 = require("./db");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const port = 5000;
function createTodoItem(message) {
    const timestamp = Date.now();
    const id = (0, uuid_1.v4)();
    const todoItem = {
        message,
        timestamp,
        id
    };
    return todoItem;
}
app.get('/todo-items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoItems = yield (0, db_1.getTodoItems)();
        res.send(todoItems);
    }
    catch (e) {
        console.log("ERROR getting todo items: ", e);
        res.status(400).send("Error getting todo items");
    }
}));
app.patch("/todo-items", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const id = req.query.id;
    if (id === undefined) {
        return res.status(400).send("Bad Request");
    }
    try {
        yield (0, db_1.patchTodoItem)(String(id), body);
        res.send("OK");
    }
    catch (e) {
        console.log("ERROr patching");
        res.status(400).send("ERROR patching todo");
    }
}));
app.post("/todo-items", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    if (!body || !body.message) {
        return res.status(400).send("LAME");
    }
    const { message } = body;
    const todoItem = createTodoItem(message);
    try {
        console.log("ADDING TODO ITEM: ", todoItem);
        yield (0, db_1.addTodoItem)(todoItem);
        res.send(todoItem);
    }
    catch (e) {
        console.log("ERROR ADDING TODO ITEM: ", e);
        res.status(400).send("There was an error adding the todo item");
    }
}));
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
