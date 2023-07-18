import { nanoid } from "nanoid";
import React, { useReducer } from "react";
import "./Todo.css";

const Todo = () => {
  const initialState = {
    input: "",
    todos: [],
    editTodoId: null,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "INPUT":
        return {
          ...state,
          input: action.payload,
        };
      case "ADD":
        return {
          ...state,
          todos: [
            ...state.todos,
            { id: nanoid(), todo: action.payload, completed: false },
          ],
          input: "",
        };
      case "DELETE":
        return {
          ...state,
          todos: state.todos.filter((todo) => todo.id !== action.payload.id),
          input: "",
          editTodoId: null,
        };
      case "EDIT":
        return {
          ...state,
          input: action.payload.todo,
          editTodoId: action.payload.id,
        };
      case "SAVE":
        return {
          ...state,
          todos: state.todos.map((todo) =>
            todo.id === action.payload.id
              ? { ...todo, todo: state.input }
              : todo
          ),
          input: "",
          editTodoId: null,
        };
      case "CANCEL":
        return { ...state, input: "", editTodoId: null };
      case "COMPLETE":
        return {
          ...state,
          todos: state.todos.map((todo) =>
            todo.id === action.payload.id
              ? { ...todo, completed: !todo.completed }
              : todo
          ),
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { input, todos, editTodoId } = state;

  const handleChange = (text) => {
    dispatch({ type: "INPUT", payload: text });
  };

  const handleADD = () => {
    dispatch({ type: "ADD", payload: input });
  };

  const handleDelete = (todo) => {
    dispatch({ type: "DELETE", payload: todo });
  };

  const handleEdit = (todo) => {
    dispatch({ type: "EDIT", payload: todo });
  };

  const handleSave = (todo) => {
    dispatch({ type: "SAVE", payload: todo });
  };

  const handleCancel = () => {
    dispatch({ type: "CANCEL" });
  };

  const handleComplete = (todo) => {
    dispatch({ type: "COMPLETE", payload: todo });
  };

  return (
    <div className="todo-container">
      <div className="todo-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          className="todo-input"
        />
        {!editTodoId ? (
          <button
            onClick={() => {
              if (input) handleADD();
            }}
            className="todo-button todo-add-button"
          >
            Add
          </button>
        ) : (
          <button
            onClick={() => {
              if (input) handleCancel();
            }}
            className="todo-button todo-cancel-button"
          >
            Cancel
          </button>
        )}
      </div>
      <div className="todo-list">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
          >
            <span className="todo-text">{todo.todo}</span>
            <div className="todo-buttons">
              <button
                onClick={() => handleDelete(todo)}
                className="todo-button todo-delete-button"
              >
                Delete
              </button>
              {editTodoId === todo.id ? (
                <button
                  onClick={() => handleSave(todo)}
                  className="todo-button todo-save-button"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(todo)}
                  className="todo-button todo-edit-button"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleComplete(todo)}
                className="todo-button todo-complete-button"
              >
                {todo.completed ? "UnComplete" : "Complete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
