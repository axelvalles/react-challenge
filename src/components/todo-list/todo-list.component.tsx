import React from "react";
import { useSelector } from "react-redux";
import {
  deleteTodo,
  selectTodos,
  selectTodosToComplete,
  toggleTodo,
} from "../../store/features/todo";
import { useAppDispatch } from "../../store";
import { Todo } from "../../models";

const TodoList = () => {
  // redux
  const dispatch = useAppDispatch();
  const todos = useSelector(selectTodos);
  const todosToComplete = useSelector(selectTodosToComplete);
  // methods
  const handleCheck = (todo: Todo) => {
    dispatch(toggleTodo(todo.id));
  };
  const handleDelete = (todo: Todo) => {
    dispatch(deleteTodo(todo.id));
  };

  return (
    <div>
      <ul className="space-y-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`alert shadow-lg ${todo.completed ? "alert-success" : ""}`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              className="checkbox"
              onChange={() => handleCheck(todo)}
            />
            <span>{todo.title}</span>
            <div>
              <button
                onClick={() => handleDelete(todo)}
                className="btn btn-sm btn-neutral"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {todos.length !== 0 && (
        <p className="py-4 font-semibold">
          <span className="mr-2">
            {todosToComplete !== 1 ? "items left" : "item left"}
          </span>
          {todosToComplete}
        </p>
      )}
    </div>
  );
};

export default TodoList;
