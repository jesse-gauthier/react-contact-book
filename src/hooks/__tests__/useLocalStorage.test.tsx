import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

describe('useLocalStorage', () => {
  it('reads and writes values, exposing typed error when write fails', () => {
    const key = 'test.key';
    const initial = { a: 1 };
    const { result } = renderHook(() => useLocalStorage<typeof initial>(key, initial));

    expect(result.current[0]).toEqual(initial);
    expect(result.current[2].error).toBeUndefined();

    const originalSetItem = window.localStorage.setItem;
    window.localStorage.setItem = () => { throw new Error('quota'); };
    act(() => {
      result.current[1]({ a: 2 });
    });
    expect(result.current[2].error).toBe('quota');
    window.localStorage.setItem = originalSetItem;
  });
});


