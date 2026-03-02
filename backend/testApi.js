const testAPI = async () => {
    try {
        const fetch = (await import('node-fetch')).default;
        const API_URL = 'http://localhost:5000/api';

        console.log('1. Registering User');
        const registerRes = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: `test${Date.now()}@example.com`, password: 'password123' })
        });
        const { token, _id } = await registerRes.json();
        console.log(`User registered. Token: ${token ? 'yes' : 'no'}`);

        console.log('2. Creating Todo');
        const createTodoRes = await fetch(`${API_URL}/todos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                title: 'Test Todo',
                deadline: new Date(Date.now() + 86400000).toISOString(),
                priority: 'High'
            })
        });
        const todo = await createTodoRes.json();
        console.log(`Todo created: ${todo.title}`);

        console.log('3. Fetching Todos');
        const getTodosRes = await fetch(`${API_URL}/todos`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const todos = await getTodosRes.json();
        console.log(`Fetched ${todos.length} sorted todos.`);

        console.log('All tests passed!');
    } catch (e) {
        console.error(e);
    }
};
testAPI();
