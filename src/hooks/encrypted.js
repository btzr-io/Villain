import React, { useContext, useEffect } from "react";
import { store } from "@/store";
import { ACTION_TYPE } from "@/constants";

function useEncrypted() {
  const { state, dispatch } = useContext(store);
  const { encrypted, password } = state;

  const setPassword = (archivePassword) => {
    dispatch({ type: ACTION_TYPE.SET_PASSWORD, payload: archivePassword });
  };

  return { encrypted, password, setPassword };
}

export default useEncrypted;
