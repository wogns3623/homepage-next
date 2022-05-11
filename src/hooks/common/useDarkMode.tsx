import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
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
  isDarkMode: null | boolean;
  setIsDarkMode: (isDarkMode: null | boolean) => void;
}

const DarkModeContext = createContext<DarkModeContextProps>({
  isDarkMode: null,
  setIsDarkMode: () => console.warn('DarkModeContext is uninitialized!'),
});

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode, initialized] = useLazyState<null | boolean>(null);

  useEffect(() => {
    if (!initialized) {
      const stored = localStorage.getItem('isDarkMode');

      if (stored === null) {
        setIsDarkMode(null);
      } else {
        setIsDarkMode(stored === 'true');
      }
    } else {
      if (isDarkMode === null) {
        localStorage.removeItem('isDarkMode');
      } else {
        localStorage.setItem('isDarkMode', String(isDarkMode));
      }
    }
  }, [isDarkMode, setIsDarkMode, initialized]);

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
    () => isDarkMode ?? systemPreferColor,
    [isDarkMode, systemPreferColor],
  );

  return (
    <div className={`${darkModeEnabled ? ' dark' : ''}`}>
      <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
        {children}
      </DarkModeContext.Provider>
    </div>
  );
}

export function useDarkMode() {
  return useContext(DarkModeContext);
}
