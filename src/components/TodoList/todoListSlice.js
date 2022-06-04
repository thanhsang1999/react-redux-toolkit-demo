import { createSlice } from '@reduxjs/toolkit';

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState: [
    { id: 1, name: 'Learn Yoga', completed: false, priority: 'Medium' },
    { id: 2, name: 'Learn redux', completed: true, priority: 'High' },
    { id: 3, name: 'Learn nodejs', completed: false, priority: 'Low' },
  ],
  reducers: {
    addTodoList(state, action) {
      state.push(action.payload);
    },
    toggleTodoStatus(state, action) {
      const todo = state.find((item) => item.id === action.payload);
      todo.completed = !todo.completed;
    },
  },
});
