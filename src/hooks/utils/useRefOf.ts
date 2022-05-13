import { useMemo, useRef } from 'react';

export function useRefOf<T>(value: T) {
  const ref = useRef<T>(value);

  // use useMemo to update ref.current before useEffect family executes
  useMemo(() => {
    ref.current = value;
  }, [value]);

  return ref;
}
