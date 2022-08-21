import React, { useContext } from "react";
import { store } from "@/store";

function useProgress() {
  const { state } = useContext(store);
  const { progress } = state;
  return progress;
}

export default useProgress;
