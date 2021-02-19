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
      userId: loggedInUser.id
    }

    axios.post('api/todos', body).then(response => {
      setInputText('');
      getTodos().then(response => setTodos(response.data));
    });
  };

  return (
      <div className="container container-fluid">
        <div className="row pt-5">
          <div className="col-lg-12 justify-content-center text-center">
          </div>
        </div>
        <div className="row pt-5">
          <div className="col-lg-12 justify-content-center text-center">
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 justify-content-center mt-5 text-center">
              <img src={logo} className="App-logo" alt="logo" />
          </div>
        </div>

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
        <div className="row">
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
