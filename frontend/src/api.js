import axios from 'axios';

const API_URL = 'http://localhost:3000/todos';

export const fetchTodos = () => axios.get(API_URL);
export const addTodo = (todo) => axios.post(API_URL, todo);
export const updateTodo = (_id, updates) => axios.put(`${API_URL}/${_id}`, updates);
export const deleteTodo = (_id) => axios.delete(`${API_URL}/${_id}`);