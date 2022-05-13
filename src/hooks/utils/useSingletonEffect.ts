import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

type SingletonEffectKey = string | readonly unknown[];

class SingletonEffectManager {
  private _effectRefs: Map<string, symbol[]> = new Map();

  private _getKeyString(key: SingletonEffectKey): string {
    return JSON.stringify(key);
  }

  private _get(key: SingletonEffectKey) {
    const mapKey = this._getKeyString(key);

    return this._effectRefs.get(mapKey);
  }

  private _push(key: SingletonEffectKey) {
    const mapKey = this._getKeyString(key);

    let list = this._effectRefs.get(mapKey);

    const value = Symbol(mapKey + `_${list ? list.length : 0}`);

    if (list) {
      // Logger.log('SingletonEffectManager', '_push', 'push', value, 'to list', mapKey);
      list.push(value);
    } else {
      // Logger.log('SingletonEffectManager', '_push', 'using', value, 'create list', mapKey);
      list = [value];
    }

    this._effectRefs.set(mapKey, list);
    return value;
  }

  private _pop(key: SingletonEffectKey, value: symbol) {
    const mapKey = this._getKeyString(key);

    const list = this._effectRefs.get(mapKey);
    if (!list) {
      // Logger.log('SingletonEffectManager', '_pop', 'cannot find list', mapKey);
      return;
    }
    const filtered = list.filter(item => item !== value);
    if (filtered.length === 0) {
      // Logger.log(
      //   'SingletonEffectManager',
      //   '_pop',
      //   'no exsiting value in list',
      //   mapKey,
      //   ', delete it',
      // );
      this._delete(key);
    } else {
      // Logger.log('SingletonEffectManager', '_pop', 'pop', value, 'from list', mapKey);
      this._effectRefs.set(mapKey, filtered);
    }
  }

  private _delete(key: SingletonEffectKey) {
    this._effectRefs.delete(this._getKeyString(key));
  }

  public create(key: SingletonEffectKey) {
    return this._push(key);
  }

  public isFirstSymbol(key: SingletonEffectKey, symbol: symbol) {
    const list = this._get(key);

    // Logger.log(
    //   'SingletonEffectManager',
    //   symbol,
    //   'isFirstSymbol?',
    //   Boolean(list && list.length > 0 && list[0] === symbol),
    // );
    return Boolean(list && list.length > 0 && list[0] === symbol);
  }

  public remove(key: SingletonEffectKey, symbol: symbol) {
    this._pop(key, symbol);
  }
}

const manager = new SingletonEffectManager();

/**
 *
 * @param keys cannot be mutated
 * @param callback cannot be mutated
 * @param deps cannot add or remove elements
 */
export function useSingletonEffect(
  callback: EffectCallback,
  deps?: DependencyList,
  keys: SingletonEffectKey = [],
) {
  const symbolRef = useRef<symbol>();

  useEffect(() => {
    symbolRef.current = manager.create(keys);

    return () => {
      if (symbolRef.current) {
        manager.remove(keys, symbolRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (symbolRef.current && manager.isFirstSymbol(keys, symbolRef.current)) callback();
  }, deps);
}
