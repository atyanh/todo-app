import React from 'react';

const TodoList = ({ todos, onToggle, deleteTodo }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo._id} className={todo.status ? 'done' : ''}>
          <input
            type="checkbox"
            checked={todo.status}
            onChange={() => onToggle(todo)}
          />
          
          <strong>{todo.name}</strong> — {todo.description}     
          <button className="delete-btn" onClick={() => deleteTodo(todo._id)}>Delete
          </button>
        </li> 
      ))}
    </ul>
  );
};

export default TodoList;
