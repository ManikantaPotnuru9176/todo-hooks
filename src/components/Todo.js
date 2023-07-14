import { nanoid } from "nanoid";
import React, { useReducer } from "react";

const Todo = () => {
  const initialState = {
    input: "",
    todos: [],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "INPUT":
        return { ...state, input: action.payload };
      case "ADD":
        return {
          ...state,
          todos: [...state.todos, { id: nanoid(), todo: action.payload }],
          input: ""
        };
        case "DELETE":
            console.log("action.paload: ", action.payload);
            console.log("state.todos", state.todos);
        return {
          todos: state.todos.filter((todo) => todo !== action.payload), input: action.payload.todo
        };
      default:
        return state;
    }
  };

  const handleChange = (text) => {
    dispatch({ type: "INPUT", payload: text });
  };

  const handleADD = () => {
    dispatch({ type: "ADD", payload: state.input });
  };

  const handleDelete = (todo) => {
    dispatch({ type: "DELETE", payload: todo });
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <div>
        <input
          type="text"
          value={state.input}
          onChange={(text) => handleChange(text.target.value)}
        />
        {state.input}
      </div>
          {state.todos.map((todo) => {
        return (
          <div key={todo.id}>
                <li>{todo.todo}</li>
            <button onClick={(todo) => handleDelete(todo)}>DELETE</button>
          </div>
        );
      })}
      <div>
        <button onClick={() => handleADD()}>ADD</button>
      </div>
    </div>
  );
};

export default Todo;
