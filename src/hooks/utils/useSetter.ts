import { DependencyList, Dispatch, SetStateAction, useCallback, useRef } from 'react';

export type AsyncDispatch<T> = (value: T) => Promise<void>;

export function useSetter<T>(
  callback: Dispatch<T> | AsyncDispatch<T>,
  deps: DependencyList = [],
  state: T,
) {
  const prevState = useRef<T>(state);

  return useCallback<Dispatch<SetStateAction<T>>>(async value => {
    const computed =
      typeof value === 'function' ? (value as (prevState: T) => T)(prevState.current) : value;

    await callback(computed);
    prevState.current = computed;
  }, deps);
}
