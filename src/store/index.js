import React, { createContext, useReducer } from "react";
import { ACTION_TYPE } from "@/constants";
import ACTIONS from "@/store/actions";
import { initialState, initialOptions } from "@/store/default";

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    const { type, payload } = action;
    if (ACTIONS[type]) {
      return ACTIONS[type](state, payload) || state;
    }
  }, initialState);

  const updateState = (payload) => {
    dispatch({ type: ACTION_TYPE.UPDATE_STATE, payload });
  };

  return (
    <Provider value={{ state, dispatch, updateState }}>{children}</Provider>
  );
};

export { store, initialState, initialOptions, StateProvider };
