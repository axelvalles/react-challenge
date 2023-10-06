import React from "react";
import Counter from "../../components/counter/counter.component";

const CounterPage = () => {
  return (
    <section className="container mx-auto pt-5 px-4">
      <h1 className="text-3xl font-bold">Counter Page</h1>
      <Counter></Counter>
    </section>
  );
};

export default CounterPage;
