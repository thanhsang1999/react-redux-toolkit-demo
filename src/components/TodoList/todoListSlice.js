import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState: {
    status: 'idle',
    todos: [],
  },
  reducers: {
    addTodoList(state, action) {
      state.todos.push(action.payload);
    },
    toggleTodoStatus(state, action) {
      const todo = state.todos.find((item) => item.id === action.payload);
      todo.completed = !todo.completed;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodoList.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchTodoList.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.status = 'idle';
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.status = 'idle';
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.status = 'idle';
        let indexTodo = state.todos.findIndex((todo) => todo.id === action.payload.id);
        state.todos[indexTodo] = action.payload
      });
  },
});

export const fetchTodoList = createAsyncThunk(
  'todos/fetchTodos',
  async function () {
    const res = await fetch('/api/todos');
    const data = await res.json();
    return data.todos;
  }
);
export const addNewTodo = createAsyncThunk(
  'todos/addNewTodo',
  async (newTodo) => {
    const res = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(newTodo),
    });
    const data = await res.json();
    return data.todos;
  }
);
export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async (idTodo) => {
    const res = await fetch('/api/updateTodo', {
      method: 'POST',
      body: JSON.stringify(idTodo),
    });
    const data = await res.json();
    console.log(data);
    return data.todos;
  }
);
