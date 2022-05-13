import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';

import { useRefOf } from './useRefOf';
import { useSetter } from './useSetter';

export function useLiftedState<T>(
  initialState: T | (() => T),
  liftedState: T | undefined,
  setLiftedState: Dispatch<T> | undefined,
): [T, Dispatch<SetStateAction<T>>] {
  const [internalState, setInternalState] = useState<T>(initialState);

  const state = useMemo(() => liftedState ?? internalState, [liftedState, internalState]);
  const refState = useRefOf<T>(internalState);

  const setState = useSetter(
    value => {
      setInternalState(value);
      setLiftedState?.(value);
    },
    [],
    state,
  );

  useEffect(() => {
    if (refState.current !== liftedState && liftedState !== undefined) {
      setInternalState(liftedState);
    }
  }, [liftedState]);

  return [state, setState];
}
