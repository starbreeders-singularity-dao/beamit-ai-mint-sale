import { useEffect, useRef } from "react";

const useLatestRef = <T,>(value: T) => {
  const valueRef = useRef<T>(value);
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef;
};

export default useLatestRef;
