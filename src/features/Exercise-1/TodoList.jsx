/** @format */

import React, { useEffect, useState } from 'react';
import { Button, Card, Form, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTodosAction,
  deleteTodosAction,
  getTodosAction,
  selectTodos,
  updateTodosAction,
} from './todoSlice';

const TodoList = () => {
  const [inputTodo, setInputTodo] = useState({ id: 1, title: '' });
  const [statusBtnAdd, setSatusBtnAdd] = useState(true);
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);

  useEffect(() => {
    dispatch(getTodosAction());
  }, [dispatch]);

  const onChange = (e) => {
    const { value } = e.target;
    setInputTodo({ ...inputTodo, title: value });
  };

  const handleAddTodo = (e) => {
    e.preventDefault();

    if (statusBtnAdd === true) {
      const todoId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
      dispatch(addTodosAction({ ...inputTodo, id: todoId }));
    } else {
      dispatch(updateTodosAction(inputTodo));
      setSatusBtnAdd(true);
    }
    setInputTodo({ id: 1, title: '' });
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodosAction(id));
  };
  const handleUpdateTodo = (todo) => {
    setInputTodo(todo);
    setSatusBtnAdd(false);
  };
  return (
    <Card style={{ width: 450, padding: 20, margin: '20px auto' }}>
      <Row as="form" className="px-3" onSubmit={handleAddTodo}>
        <Form.Control
          required
          type="text"
          placeholder="New todo..."
          value={inputTodo.title}
          onChange={onChange}
        />
        <Button className="my-3" type="submit">
          {statusBtnAdd === true ? 'Add todo' : 'Update todo'}
        </Button>
      </Row>
      <h2>TODO LIST</h2>
      <ListGroup>
        {todos &&
          todos.map((todo) => {
            return (
              <ListGroup.Item
                className="d-flex justify-content-between"
                key={todo.id}>
                <span className="fs-5">{todo.title}</span>
                <div>
                  <Button
                    className="p-1 me-2"
                    variant="outline-secondary"
                    onClick={() => handleUpdateTodo(todo)}>
                    Edit
                  </Button>
                  <Button
                    className="p-1 "
                    variant="outline-secondary"
                    onClick={() => handleDeleteTodo(todo.id)}>
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    </Card>
  );
};

export default TodoList;
