import React from "react";
import { TodoForm, TodoList } from "../../components";

const TodosPage = () => {
  return (
    <section className="container mx-auto pt-5 px-4">
      <h1 className="text-3xl font-bold mb-5">Todo Page</h1>
      <div className="max-w-lg mx-auto space-y-4">
        <TodoForm></TodoForm>
        <TodoList></TodoList>
      </div>
    </section>
  );
};

export default TodosPage;
