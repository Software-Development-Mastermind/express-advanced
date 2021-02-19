import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    axios.get('api/todos').then(response => setTodos(response.data));
  }, []);

  const deleteTodo = (todoId) => {
    axios.delete(`api/todos/${todoId}`).then(response => {
      axios.get('api/todos').then(response => setTodos(response.data));
    });
  }

  const todoListItems = todos.map(todo => {
    return <li key={todo.id}>{todo.text} <FontAwesomeIcon icon={faTrash} onClick={(e) => deleteTodo(todo.id)} /></li>
  });

  const onSubmit = (e) => {
    e.preventDefault();

    const body = {
      text: inputText,
      userId: 1
    }

    axios.post('api/todos', body).then(response => {
      axios.get('api/todos').then(response => setTodos(response.data));
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={onSubmit}>
          <input value={inputText} onChange={(e) => setInputText(e.target.value)} />
          <button type="submit">Add</button>
        </form>
      <ul>
        {todoListItems}
      </ul>
      </header>
    </div>
  );
}

export default App;
