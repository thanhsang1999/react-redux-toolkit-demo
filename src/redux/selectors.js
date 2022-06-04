// export const selectorTodoList = (state) => {
//   const { filters, todoList } = state;
//   const { search, status, priority } = filters;
//   return Array.from(todoList)
//     .filter(
//       (item) => item.name.toLowerCase().indexOf(search.toLowerCase()) > -1
//     )
//     .filter(
//       (item) =>
//         status === 'All' ||
//         (status === 'Completed' ? item.completed : !item.completed)
//     );
// };
// export const selectorTodoListFilter = (state) => {
//     const { filters, todoList } = state;
//     const { search, status, priority } = filters;
//     return Array.from(todoList)
//       .filter(
//         (item) => item.name.toLowerCase().indexOf(search.toLowerCase()) > -1
//       )
//       .filter(
//         (item) =>
//           status === 'All' ||
//           (status === 'Completed' ? item.completed : !item.completed)
//       );
//   };

import { createSelector } from '@reduxjs/toolkit';

export const selectorTodoList = (state) => state.todoList;
export const selectorFilterSearch = (state) => state.filters.search;
export const selectorFilterStatus = (state) => state.filters.status;
export const selectorFilterPriories = (state) => state.filters.priorities;

export const todoListRemainingSelector = createSelector(
  selectorTodoList,
  selectorFilterSearch,
  selectorFilterStatus,
  selectorFilterPriories,
  (todoList, search, status, priorities) => {
    return Array.from(todoList)
      .filter(
        (item) => item.name.toLowerCase().indexOf(search.toLowerCase()) > -1
      )
      .filter(
        (item) =>
          status === 'All' ||
          (status === 'Completed' ? item.completed : !item.completed)
      )
      .filter((item) => {
        return (
          priorities.length === 0 ||
          priorities.some((priority) => priority === item.priority)
        );
      });
  }
);
