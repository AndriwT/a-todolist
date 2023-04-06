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
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchTodoItem = exports.getTodoItems = exports.addTodoItem = void 0;
const firestore_1 = require("firebase-admin/firestore");
const db = (0, firestore_1.getFirestore)();
function addTodoItem(todoItem) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db.collection('todo-items').doc(todoItem.id).set(todoItem);
    });
}
exports.addTodoItem = addTodoItem;
function getTodoItems() {
    return __awaiter(this, void 0, void 0, function* () {
        const ref = db.collection("todo-items");
        const snapshots = yield ref.get();
        const docs = snapshots.docs;
        return docs.map(doc => doc.data());
    });
}
exports.getTodoItems = getTodoItems;
function patchTodoItem(id, partialTodo) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db.collection("todo-items").doc(id).update(partialTodo);
    });
}
exports.patchTodoItem = patchTodoItem;
