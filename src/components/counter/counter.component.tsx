import { useAppDispatch, useAppSelector } from "../../store";
import {
  decrementCounter,
  divideCounter,
  duplicateCounter,
  incrementCounter,
  selectCounter,
} from "../../store/features/counter";

const Counter = () => {
  // redux
  const count = useAppSelector(selectCounter);
  const dispatch = useAppDispatch();
  // methods
  const handleIncrement = () => {
    dispatch(incrementCounter());
  };
  const handleDecrement = () => {
    dispatch(decrementCounter());
  };
  const handleDuplicate = () => {
    dispatch(duplicateCounter());
  };
  const handleDivide = () => {
    dispatch(divideCounter());
  };
  return (
    <div className="max-w-lg w-full p-4 mx-auto">
      <div className="stats border shadow w-full mb-8">
        <div className="stat">
          <div className="stat-title">Counter</div>
          <div className="stat-value">{count}</div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <button
          className="btn btn-neutral btn-sm md:btn-md"
          onClick={() => handleIncrement()}
        >
          Increment
        </button>
        <button
          className="btn btn-neutral btn-sm md:btn-md"
          onClick={() => handleDecrement()}
        >
          Decrement
        </button>
        <button
          className="btn btn-neutral btn-sm md:btn-md"
          onClick={() => handleDuplicate()}
        >
          Duplicate
        </button>
        <button
          className="btn btn-neutral btn-sm md:btn-md"
          onClick={() => handleDivide()}
        >
          Divide
        </button>
      </div>
    </div>
  );
};

export default Counter;
