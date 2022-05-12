import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

function setMultipleState<T>(setStateList: Array<Dispatch<T>>, value: T) {
  setStateList.forEach(setState => {
    setState(value);
  });
}

/**
 * @description
 * - 같은 index의 state와 setState를 한 쌍으로 생각함
 * - 만약 여러 state가 동시에 업데이트된다면 배열에서 가장 마지막에 있는 state를 기준으로 업데이트한다.
 *
 * @todo 초기화하는 값과 valueList의 값이 달라 값이 초기화되자마자 valueList의 마지막 값으로 업데이트되는 경우가 있음
 */
export function useSynchronizedState<T>(
  initialState: T | (() => T),
  stateValueList: ReadonlyArray<T | undefined> = [],
  nullableSetStateList: ReadonlyArray<Dispatch<T> | undefined> = [],
): [state: T, setState: Dispatch<SetStateAction<T>>] {
  const [internalState, setInternalState] = useState<T>(initialState);
  const prevState = useRef<T>(internalState);

  const setStateList = useMemo(
    () => nullableSetStateList.filter((ss): ss is Dispatch<T> => !!ss),
    nullableSetStateList,
  );

  const setState = useCallback(async (value: SetStateAction<T>) => {
    const computed =
      typeof value === 'function' ? (value as (prevState: T) => T)(prevState.current) : value;

    prevState.current = computed;
    setInternalState(computed);
    setMultipleState(
      setStateList.filter((ss): ss is Dispatch<T> => !!ss),
      computed,
    );
  }, setStateList);

  useLayoutEffect(() => {
    const [finalState, lastSetStateIndex] = stateValueList.reduce(
      (acc, state, index) => {
        if (prevState.current !== state && state !== undefined) {
          return [state, index];
        } else {
          return acc;
        }
      },
      [prevState.current, -1],
    );

    if (lastSetStateIndex === -1) {
      return;
    }

    prevState.current = finalState;
    setInternalState(finalState);
    setMultipleState(
      setStateList.filter((ss): ss is Dispatch<T> => !!ss),
      finalState,
    );
  }, stateValueList);

  return [internalState, setState];
}
