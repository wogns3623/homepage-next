import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useLazyState } from '@hooks/utils';

interface DarkModeContextProps {
  /**
   * @description
   * - null이면 기기 설정을 따라감
   *
   * @default null
   */
  darkMode: null | boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  resetDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextProps>({
  darkMode: null,
  setDarkMode: () => console.warn('DarkModeContext is uninitialized!'),
  resetDarkMode: () => console.warn('DarkModeContext is uninitialized!'),
});

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode, initialized] = useLazyState<null | boolean>(null);

  const resetDarkMode = useCallback(() => setDarkMode(null), [setDarkMode]);

  useEffect(() => {
    if (!initialized) {
      const stored = localStorage.getItem('DarkMode');

      if (stored === null) {
        setDarkMode(null);
      } else {
        setDarkMode(stored === 'true');
      }
    } else {
      if (darkMode === null) {
        localStorage.removeItem('DarkMode');
      } else {
        localStorage.setItem('DarkMode', String(darkMode));
      }
    }
  }, [darkMode, initialized]);

  const [systemPreferColor, setSystemPreferColor] = useState<boolean>(false);
  useEffect(() => {
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPreferColor(e.matches);
    };

    const mlq = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemPreferColor(mlq.matches);
    mlq.addEventListener('change', handleChange);

    return () => {
      mlq.removeEventListener('change', handleChange);
    };
  }, []);

  const darkModeEnabled = useMemo(
    () => darkMode ?? systemPreferColor,
    [darkMode, systemPreferColor],
  );

  return (
    <div className={`${darkModeEnabled ? ' dark' : ''}`}>
      <DarkModeContext.Provider
        value={{
          darkMode,
          setDarkMode: setDarkMode as Dispatch<SetStateAction<boolean>>,
          resetDarkMode,
        }}>
        {children}
      </DarkModeContext.Provider>
    </div>
  );
}

export function useDarkMode() {
  return useContext(DarkModeContext);
}
