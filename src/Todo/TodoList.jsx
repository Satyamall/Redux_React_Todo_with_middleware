import { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  getTodosFailure,
  getTodosRequest,
  getTodosSuccess,
  removeTodo,
  toggleTodo
} from "../redux/app/action";

function TodoItem({ title, status, onDelete, id, onToggle }) {
  return (
    <div style={{ display: "flex", padding: "1rem", gap: "2rem" }}>
      <div>{title}</div>
      <div>{`${status}`}</div>
      <button onClick={() => onDelete(id)}>Delete</button>
      <button onClick={() => onToggle(id)}>Toggle Status</button>
    </div>
  );
}

function TodoList() {
  const { todos, isLoading, isError } = useSelector(
    (state) => state.app,
    shallowEqual
  );
  const dispatch = useDispatch();

  const getTodos = () => {
    // pre fetch
    const requestAction = getTodosRequest();
    dispatch(requestAction);
    return fetch("https://json-server-mocker-masai.herokuapp.com/tasks")
      .then((res) => res.json())
      .then((res) => {
        //success
        const successAction = getTodosSuccess(res);
        dispatch(successAction);
      })
      .catch((res) => {
        // failure
        const failureAction = getTodosFailure();
        dispatch(failureAction);
      });
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleDelete = (id) => {
    const action = removeTodo(id);
    dispatch(action);
  };

  const handleToggle = (id) => {
    const action = toggleTodo(id);
    dispatch(action);
  };

  return (
    <div>
      {isLoading && <h3>Loading...</h3>}
      {isError && <h3> Something went wrong!</h3>}
      {todos.map((item) => (
        <TodoItem
          key={item.id}
          {...item}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}

export default TodoList;
