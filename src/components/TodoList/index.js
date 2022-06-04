import { } from '@reduxjs/toolkit';
import { Button, Col, Input, Row, Select, Tag } from 'antd';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { todoListRemainingSelector } from '../../redux';
import Todo from '../Todo';
import { todoListSlice } from './todoListSlice';

export default function TodoList() {
  /**
   * State
   */
  const [todo, setTodo] = useState('');
  const [priority, setPriority] = useState('Medium');
  /**
   * Redux
   */
  const dispatch = useDispatch();
  const todoList = useSelector(todoListRemainingSelector);
  const { addTodoList } = todoListSlice.actions;
  /**
   * Ref
   */
  const inputRef = useRef();
  /**
   * Function Handle
   */
  function handleInputChange(e) {
    setTodo(e.target.value);
  }
  function handleSelectChange(e) {
    setPriority(e);
  }
  function handleAddTodo() {
    dispatch(
      addTodoList({
        id: uuidv4(),
        completed: false,
        name: todo,
        priority: priority,
      })
    );
    setTodo('');
    setPriority('Medium');
    inputRef.current.focus();
  }
  /**
   * Return JSX
   */
  return (
    <Row style={{ height: 'calc(100% - 40px)' }}>
      <Col span={24} style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
        {Array.from(todoList).map((item) => (
          <Todo
            key={item.id}
            id={item.id}
            completed={item.completed}
            name={item.name}
            prioriry={item.priority}
          />
        ))}
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: 'flex' }} compact>
          <Input value={todo} onChange={handleInputChange} ref={inputRef} />
          <Select defaultValue={priority} onChange={handleSelectChange}>
            <Select.Option value='High' label='High'>
              <Tag color='red'>High</Tag>
            </Select.Option>
            <Select.Option value='Medium' label='Medium'>
              <Tag color='blue'>Medium</Tag>
            </Select.Option>
            <Select.Option value='Low' label='Low'>
              <Tag color='gray'>Low</Tag>
            </Select.Option>
          </Select>
          <Button type='primary' onClick={handleAddTodo}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
