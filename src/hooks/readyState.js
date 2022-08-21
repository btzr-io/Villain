import React, { useContext } from "react";
import { store } from "@/store";

function useReadyState() {
  const { state } = useContext(store);
  return state.readyState;
}

export default useReadyState;
