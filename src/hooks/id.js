import React, { useState, useId } from "react";

function useUniqueId() {
  const [id] = useState(
    () => `component-${Math.random().toString(16).slice(2)}`
  );
  return id;
}

export default useId || useUniqueId;
