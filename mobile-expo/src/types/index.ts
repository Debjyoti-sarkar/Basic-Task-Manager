export interface User {
    _id: string;
    email: string;
    token?: string;
}

export interface Todo {
    _id: string;
    title: string;
    description: string;
    deadline: string;
    priority: 'Low' | 'Medium' | 'High';
    tags: string[];
    isCompleted: boolean;
    createdAt: string;
}
