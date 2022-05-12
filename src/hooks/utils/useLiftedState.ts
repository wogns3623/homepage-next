import {
  Dispatch,
  SetStateAction,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useSetter } from './useSetter';

export function useLiftedState<T>(
  initialState: T | (() => T),
  liftedState?: T,
  setLiftedState?: Dispatch<T>,
): [T, Dispatch<SetStateAction<T>>] {
  const [internalState, setInternalState] = useState<T>(() => {
    if (typeof initialState === 'function') {
      return (initialState as () => T)();
    } else {
      return initialState;
    }
  });

  const state = useMemo(() => liftedState ?? internalState, [liftedState, internalState]);

  const prevState = useRef<T>(state);

  const setState = useSetter(
    state,
    value => {
      setInternalState(value);
      setLiftedState && setLiftedState(value);
    },
    [setInternalState, setLiftedState],
  );

  // const setState = useCallback((value: SetStateAction<T>) => {

  useLayoutEffect(() => {
    if (prevState.current !== liftedState && liftedState !== undefined) {
      setInternalState(liftedState);
    }
  }, [liftedState]);

  return [state, setState];
}
