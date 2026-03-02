import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import Todo from '../models/Todo';
import { sortTodos } from '../utils/sorting';

export const getTodos = async (req: AuthRequest, res: Response) => {
    try {
        const todos = await Todo.find({ user: req.user });
        res.json(sortTodos(todos));
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createTodo = async (req: AuthRequest, res: Response) => {
    try {
        const { title, description, deadline, priority, tags } = req.body;

        if (!title || !deadline) {
            return res.status(400).json({ message: 'Title and deadline are required' });
        }

        const todo = await Todo.create({
            user: req.user,
            title,
            description,
            deadline,
            priority: priority || 'Medium',
            tags: tags || [],
        });

        res.status(201).json(todo);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTodo = async (req: AuthRequest, res: Response) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        if (todo.user.toString() !== req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTodo);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTodo = async (req: AuthRequest, res: Response) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        if (todo.user.toString() !== req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await todo.deleteOne();
        res.json({ message: 'Todo removed' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
