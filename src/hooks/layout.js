import React, { useContext } from "react";
import { store } from "@/store";
import { ACTION_TYPE } from "@/constants";

function useLayout() {
  const { state, dispatch } = useContext(store);
  const setLayout = (layout) =>
    dispatch({ type: ACTION_TYPE.SET_LAYOUT, payload: layout });
  return [state.options.layout, setLayout];
}

export default useLayout;
