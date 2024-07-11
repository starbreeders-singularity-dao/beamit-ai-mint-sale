/* eslint-disable no-unused-vars */
import { useCallback, useEffect } from "react";
import eventEmitter from "services/event.emitter";
import useLatestRef from "./useLatestRef ";

const useEventEmitter = (
  eventName: string,
  callback: (...args: any[]) => unknown
) => {
  const callbackRef = useLatestRef(callback);

  const handleEvent = useCallback(
    (...data: unknown[]) => {
      callbackRef.current(...data);
    },
    [callbackRef]
  );

  useEffect(() => {
    if (eventName?.trim()) {
      eventEmitter.on(eventName, handleEvent);
    }
    return () => {
      eventEmitter.off(eventName, handleEvent);
    };
  }, [eventName, handleEvent]);
};

export default useEventEmitter;
