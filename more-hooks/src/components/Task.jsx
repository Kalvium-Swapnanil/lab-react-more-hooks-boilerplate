import { useReducer, useRef } from "react";
import "./Task.css"; // Importing the CSS file

function Task() {
  const taskReducer = (state, action) => {
    switch (action.type) {
      case "ADDINGTASK":
        return {
          ...state,
          tasks: [...state.tasks, { text: action.payload, isVisible: true }],
        };
      case "TOGGLINGTASK":
        return {
          ...state,
          tasks: state.tasks.map((task, index) =>
            index === action.payload
              ? { ...task, isVisible: !task.isVisible }
              : task
          ),
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(taskReducer, { tasks: [] });
  const inputRef = useRef(null);

  const handleFocusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input className="field"
        type="text"
        placeholder=" Add a task"
        ref={inputRef}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.value.trim() !== "") {
            dispatch({ type: "ADDINGTASK", payload: e.target.value.trim() });
            e.target.value = "";
          }
        }}
      />
      <ul className="task-list" type='none'>
        {state.tasks.map((task, index) => (
          <li
            className="task-item"
            key={index}
          >
            {task.isVisible ? (
              <span>{task.text}</span>
            ) : (
              <span>The content is hidden</span>
            )}
            <br />
            <br />
            <button onClick={() => dispatch({ type: "TOGGLINGTASK", payload: index })}>Toggle</button>
          </li>
        ))}
      </ul>
      <button onClick={handleFocusInput} style={{ marginTop: "15px" }}>
        Focus Input
      </button>
    </div>
  );
}

export default Task;
