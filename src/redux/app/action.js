import { appConstants } from "./actionTypes";

export const getTodosRequest = () => {
  return {
    type: appConstants.GET_TODO_REQUEST,
    payload: {
      isLoading: true
    }
  };
};

export const getTodosSuccess = (todos) => {
  return {
    type: appConstants.GET_TODO_SUCCESS,
    payload: {
      todos: todos
    }
  };
};

export const getTodosFailure = () => {
  return {
    type: appConstants.GET_TODO_FAILURE,
    payload: {
      isError: true
    }
  };
};

// actionCreators
// type is mandatory, string
export const addTodo = ({ title, status, id }) => {
  return {
    type: appConstants.ADD_TODO,
    payload: {
      title,
      status,
      id
    }
  };
};

export const removeTodo = (id) => ({
  type: appConstants.REMOVE_TODO_ITEM,
  payload: {
    id: id
  }
});

export const toggleTodo = (id) => ({
  type: appConstants.TOGGLE_TODO_STATUS,
  payload: {
    id: id
  }
});
