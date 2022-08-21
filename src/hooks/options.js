import React, { useContext } from "react";
import { store, initialOptions } from "@/store";
import { ACTION_TYPE } from "@/constants";

function useOptions() {
  const { state, dispatch } = useContext(store);
  const { options } = state;

  const setOptions = (nextOptions) => {
    dispatch({ type: ACTION_TYPE.UPDATE_OPTIONS, payload: nextOptions });
  };

  const resetOptions = (nextOptions) => {
    dispatch({ type: ACTION_TYPE.UPDATE_OPTIONS, payload: initialOptions });
  };

  return { options, setOptions, resetOptions };
}

export default useOptions;
