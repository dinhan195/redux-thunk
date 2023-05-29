/** @format */

import React, { useEffect, useState } from 'react';
import { Button, Card, Form, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addUserAction, deleteUserAction, fetchUserAction } from './userSlice';

const UserManager = () => {
  const [inputUser, setInputUser] = useState({ id: 1, name: '' });
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  useEffect(() => {
    dispatch(fetchUserAction());
  }, [dispatch]);

  const onChange = (e) => {
    const { value } = e.target;
    setInputUser({ ...inputUser, name: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    dispatch(addUserAction({ ...inputUser, id: userId }));
    setInputUser({ id: 1, name: '' });
  };
  const handleDelete = (id) => {
    dispatch(deleteUserAction(id));
  };
  return (
    <Card className="p-4 m-auto mt-3" style={{ width: 450 }}>
      <Row as="form" onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          placeholder="Input username"
          value={inputUser.name}
          onChange={onChange}
        />
        <Button className="my-3" type="submit">
          Add user
        </Button>
      </Row>
      <h2>User list</h2>
      <ListGroup>
        {users &&
          users.map((user) => {
            return (
              <ListGroup.Item
                key={user.id}
                className="d-flex justify-content-between">
                <span className="fs-5">{user.name}</span>
                <Button
                  className="py-1"
                  variant="outline-secondary"
                  onClick={() => handleDelete(user.id)}>
                  delete
                </Button>
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    </Card>
  );
};

export default UserManager;
