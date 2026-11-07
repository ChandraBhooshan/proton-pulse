import React, { useState } from "react";
import "./Counter.css";

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    setCount((prev) => prev - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="counter-widget">
      <h3>Counter</h3>

      <div className="counter-display">{count}</div>

      <div className="counter-controls">
        <button
          className="counter-btn decrement"
          onClick={decrement}
          aria-label="Decrease count"
        >
          −
        </button>

        <button className="counter-btn reset" onClick={reset}>
          Reset
        </button>

        <button
          className="counter-btn increment"
          onClick={increment}
          aria-label="Increase count"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Counter;
