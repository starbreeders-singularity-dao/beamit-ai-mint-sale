import { useCallback, useState } from "react";

// Parameter is the boolean, with default "false" value
interface useToggleReturnType {
  state: boolean;
  toggle?: () => void;
  handleopen?: () => void;
  handleclose?: () => void;
}

export const useToggle = (
  initialState: boolean = false
): useToggleReturnType => {
  // Initialize the state
  const [state, setState] = useState<boolean>(initialState);
  const toggle = useCallback((): void => setState((state) => !state), []);
  const handleopen = useCallback((): void => setState(true), []);
  const handleclose = useCallback((): void => setState(false), []);

  return { state, toggle, handleopen, handleclose };
};
