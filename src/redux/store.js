import { configureStore } from '@reduxjs/toolkit';
import { filtersSlice } from '../components/Filters/filtersSlice';
import { todoListSlice } from '../components/TodoList/todoListSlice';

export const store = configureStore({
  reducer: {
    filters: filtersSlice.reducer,
    todoList: todoListSlice.reducer,
  },
});
