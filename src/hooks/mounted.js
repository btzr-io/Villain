import React, { useRef } from "react";

const useIsMounted = () => {
  const mounted = useRef(true);

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  return mounted.current;
};
export default useIsMounted;
