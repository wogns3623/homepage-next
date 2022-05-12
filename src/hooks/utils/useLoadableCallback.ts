import { useCallback, useRef } from 'react';

export function useLoadableCallback<Callback extends (...args: any[]) => any>(
  callback: Callback,
  deps: any[] = [],
) {
  const loading = useRef(false);

  const loadableCallback = useCallback<
    (...args: Parameters<Callback>) => Promise<ReturnType<Callback>>
  >(async (...args) => {
    if (loading.current) {
      return;
    }

    loading.current = true;
    const ret = await callback(...args);
    loading.current = false;
    return ret;
  }, deps);

  return loadableCallback;
}
