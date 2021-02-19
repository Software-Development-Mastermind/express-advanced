import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios';

function HomeContainer(props) {
  const { loggedInUser } = props;
  
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    axios.get(`api/todos?user_id=${loggedInUser.id}`).then(response => setTodos(response.data));
  }, []);

  const getTodos = () => {
    return axios.get(`api/todos?user_id=${loggedInUser.id}`);
  }

  const deleteTodo = (todoId) => {
    axios.delete(`api/todos/${todoId}`).then(response => {
      getTodos().then(response => setTodos(response.data));
    });
  }

  let todoListItems = todos.map(todo => {
    return <li key={todo.id} className="list-group-item">{todo.text} <FontAwesomeIcon className="float-right fa-button" icon={faTrash} onClick={(e) => deleteTodo(todo.id)} /></li>
  });

  if (todos.length === 0) {
    todoListItems = <li className="list-group-item">No todo items have been added yet!</li>
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const body = {
      text: inputText,
      userId: localStorage.getItem(localStorageUserKey)
    }

    axios.post('api/todos', body).then(response => {
      setInputText('');
      getTodos().then(response => setTodos(response.data));
    });
  };

  return (
    <div className="App">
      <div className="container container-fluid">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>

        <div className="row">
          <form className="col-lg-4 offset-lg-4" onSubmit={onSubmit}>
            <div className="input-group mb-3">
              <input 
                className="form-control" 
                value={inputText} onChange={(e) => setInputText(e.target.value)} 
                placeholder="Do Laundry..."/>
              <div className="input-group-append">
                <button className="btn btn-primary" type="submit">Add</button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-lg-4 offset-lg-4">
          <ul className="list-group">
            {todoListItems}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomeContainer;
