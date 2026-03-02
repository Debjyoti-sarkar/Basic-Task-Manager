import { ITodo } from '../models/Todo';

export const sortTodos = (todos: ITodo[]): ITodo[] => {
    const now = new Date();

    return todos.sort((a, b) => {
        // 1. Completed at bottom
        if (a.isCompleted && !b.isCompleted) return 1;
        if (!a.isCompleted && b.isCompleted) return -1;
        if (a.isCompleted && b.isCompleted) return 0; // if both completed, we don't care

        // Calculate Urgency Score for A
        let scoreA = 0;
        const timeToDeadlineA = new Date(a.deadline).getTime() - now.getTime();
        if (timeToDeadlineA < 0) scoreA += 1000; // Overdue
        else if (timeToDeadlineA < 86400000) scoreA += 500; // Next 24h
        else scoreA += 10000000000 / (timeToDeadlineA || 1);

        if (a.priority === 'High') scoreA *= 2;
        if (a.priority === 'Low') scoreA *= 0.5;

        // Calculate Urgency Score for B
        let scoreB = 0;
        const timeToDeadlineB = new Date(b.deadline).getTime() - now.getTime();
        if (timeToDeadlineB < 0) scoreB += 1000; // Overdue
        else if (timeToDeadlineB < 86400000) scoreB += 500; // Next 24h
        else scoreB += 10000000000 / (timeToDeadlineB || 1);

        if (b.priority === 'High') scoreB *= 2;
        if (b.priority === 'Low') scoreB *= 0.5;

        // Higher score first
        if (scoreA !== scoreB) {
            return scoreB - scoreA;
        }

        // Tie-breaker: creation time (newer first)
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
};
