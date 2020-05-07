import { useEffect, useRef } from 'react';

type Options = {
  element?: HTMLElement;
  type?: 'keyup' | 'keydown' | 'keypress';
  eventListenerOptions?: boolean | AddEventListenerOptions | undefined;
  preventDefault?: boolean;
  stopPropagation?: boolean;
};

const useHotkey = (
  key: string,
  callback: () => void,
  options?: Options,
): void => {
  const element = options?.element ?? window;
  const type = options?.type ?? 'keydown';
  const eventListenerOptions = options?.eventListenerOptions ?? true;
  const preventDefault = options?.preventDefault ?? true;
  const stopPropagation = options?.stopPropagation ?? true;

  const savedCallback = useRef(callback);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect((): () => void => {
    const canEventListener = element?.addEventListener;
    if (!canEventListener) {
      return (): void => { /**/ };
    }

    const keyDownHandler = ((event: KeyboardEvent): void => {
      if (key !== '*' && event.key !== key) {
        return;
      }

      if (preventDefault) {
        event.preventDefault();
      }

      if (stopPropagation) {
        event.stopPropagation();
      }

      savedCallback.current();
    }) as EventListener;

    element.addEventListener(type, keyDownHandler, eventListenerOptions);

    return (): void => {
      element.removeEventListener(type, keyDownHandler, eventListenerOptions);
    };
  }, [element]);
};

export default useHotkey;
