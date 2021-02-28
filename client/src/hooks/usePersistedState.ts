import { Dispatch, SetStateAction, useState, useEffect } from 'react';

type Response<T> = [T, Dispatch<SetStateAction<T>>];

export default function usePersistedState<T>(
  key: string,
  initialState: T,
): Response<T> {
  const [state, setState] = useState(() => {
    if (process.browser) {
      const storageValue = window.localStorage.getItem(key);

      if (storageValue) {
        return JSON.parse(storageValue);
      }

      return initialState;
    }

    return initialState;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
