import { useCallback, useEffect, useRef, useState } from "react";
import type { StorageError } from "../types";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, StorageError] {
  const isFirstLoadRef = useRef(true);
  const [state, setState] = useState<T>(initialValue);
  const [error, setError] = useState<string | undefined>(undefined);

  // Load on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw != null) {
        const parsed = JSON.parse(raw) as T;
        setState(parsed);
      } else {
        // seed initial value
        window.localStorage.setItem(key, JSON.stringify(initialValue));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to read localStorage");
      // keep initialValue in memory but avoid overwriting possibly corrupt data
    } finally {
      isFirstLoadRef.current = false;
    }
  }, [key]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setState((prev) => {
        const next =
          typeof value === "function" ? (value as (p: T) => T)(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
          setError(undefined);
        } catch (e) {
          setError(
            e instanceof Error ? e.message : "Failed to write localStorage"
          );
        }
        return next as T;
      });
    },
    [key]
  );

  // Sync across tabs
  useEffect(() => {
    function handleStorage(ev: StorageEvent) {
      if (
        ev.storageArea === window.localStorage &&
        ev.key === key &&
        ev.newValue
      ) {
        try {
          const parsed = JSON.parse(ev.newValue) as T;
          // avoid echo on initial load
          if (!isFirstLoadRef.current) {
            setState(parsed);
          }
        } catch {
          // ignore parse errors from external changes
        }
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [key]);

  return [state, setValue, { error }];
}
