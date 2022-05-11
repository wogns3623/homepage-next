import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';

export function useLazyState<T>(
  initialState: T | (() => T),
): [T, Dispatch<SetStateAction<T>>, boolean] {
  const [state, setState] = useState<T>(initialState);
  const [isInitialized, setIsInitialized] = useState(false);
  const initRef = useRef(false);

  const setStateWithInit = useCallback<Dispatch<SetStateAction<T>>>(value => {
    setState(value);

    if (!initRef.current) {
      setIsInitialized(true);
      initRef.current = true;
    }
  }, []);

  return [state, setStateWithInit, isInitialized];
}
