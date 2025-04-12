import React, { useEffect, useState } from 'react';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from './api';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  const loadTodos = async () => {
    const res = await fetchTodos();
    setTodos(res.data);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAdd = async (todo) => {
    const res = await addTodo(todo);
    setTodos([...todos, res.data]);
  };

  const handleToggle = async (todo) => {
    console.log (todo)
    const res = await updateTodo(todo._id, { status: !todo.status });
    setTodos(todos.map((t) => (t._id === res.data._id ? res.data : t)));
  };

  const handleDelete = async (id) => {
    const res = await deleteTodo(id);
    loadTodos();
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onToggle={handleToggle} deleteTodo={handleDelete} />
    </div>
  );
}

export default App;
