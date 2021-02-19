import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function TodoItem({ todo, deleteTodo }) {
  return <li key={todo.id} className="list-group-item">{todo.text} <FontAwesomeIcon className="float-right fa-button" icon={faTrash} onClick={(e) => deleteTodo(todo.id)} /></li>
}

export default TodoItem;