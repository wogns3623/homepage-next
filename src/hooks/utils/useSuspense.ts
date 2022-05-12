import { useCallback } from 'react';

import { Task } from '@utils';

type SuspenseKey = Array<string | number>;
type SuspenseResolver = () => void;

class SuspenseManager {
  private _taskMap: Map<string, Task<void>> = new Map();

  public createSuspense(
    key: SuspenseKey,
    suspenseResolveCallback?: (resolver: SuspenseResolver) => void,
  ): Task<void> {
    const stored = this._taskMap.get(JSON.stringify(key));
    if (stored) return stored;

    console.log('createSuspense', key.join(', '));

    const promise = new Task<void>();
    suspenseResolveCallback?.(promise.resolve);
    this._taskMap.set(JSON.stringify(key), promise);

    return promise;
  }

  public resolveSuspense(key: SuspenseKey): void {
    const task = this._taskMap.get(JSON.stringify(key));

    if (task) {
      console.log('resolveSuspense', key.join(', '));
      task.resolve();

      this._taskMap.delete(JSON.stringify(key));
    }
  }
}

const manager = new SuspenseManager();

/**
 *
 * @param defaultKey immutable
 * @returns create a suspense task and resolve it.
 */
export function useSuspense(
  defaultKey: SuspenseKey = [],
): [
  (
    key?: SuspenseKey,
    suspenseResolveCallback?: (resolver: SuspenseResolver) => void,
  ) => Promise<void>,
  (key?: SuspenseKey) => void,
] {
  const createSuspense = useCallback(
    (key: SuspenseKey = [], suspenseResolveCallback?: (resolver: SuspenseResolver) => void) =>
      manager.createSuspense([...key, ...defaultKey], suspenseResolveCallback),
    [],
  );

  const resolveSuspense = useCallback(
    (key: SuspenseKey = []) => manager.resolveSuspense([...key, ...defaultKey]),
    [],
  );

  return [createSuspense, resolveSuspense];
}
