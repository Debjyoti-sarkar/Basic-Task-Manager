"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodos = void 0;
const Todo_1 = __importDefault(require("../models/Todo"));
const getTodos = async (req, res) => {
    try {
        const todos = await Todo_1.default.find({ user: req.user });
        res.json(todos);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getTodos = getTodos;
const createTodo = async (req, res) => {
    try {
        const { title, description, deadline, priority, tags } = req.body;
        if (!title || !deadline) {
            return res.status(400).json({ message: 'Title and deadline are required' });
        }
        const todo = await Todo_1.default.create({
            user: req.user,
            title,
            description,
            deadline,
            priority: priority || 'Medium',
            tags: tags || [],
        });
        res.status(201).json(todo);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createTodo = createTodo;
const updateTodo = async (req, res) => {
    try {
        const todo = await Todo_1.default.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        if (todo.user.toString() !== req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        const updatedTodo = await Todo_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTodo);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateTodo = updateTodo;
const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo_1.default.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        if (todo.user.toString() !== req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        await todo.deleteOne();
        res.json({ message: 'Todo removed' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteTodo = deleteTodo;
