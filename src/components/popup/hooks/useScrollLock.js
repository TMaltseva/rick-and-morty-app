import { useCallback, useRef, useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalScrollLock = createGlobalStyle`
  body {
    overflow: ${({ isLocked }) => (isLocked ? 'hidden' : 'auto')};
    position: ${({ isLocked }) => (isLocked ? 'fixed' : 'static')};
    width: ${({ isLocked }) => (isLocked ? '100%' : 'auto')};
    top: ${({ isLocked, scrollPosition }) =>
      isLocked && scrollPosition ? `-${scrollPosition}px` : '0'};
  }
`;

export function useScrollLock() {
  const [locked, setLocked] = useState(false);
  const scrollOffset = useRef(0);

  const lockScroll = useCallback(() => {
    if (!locked) {
      scrollOffset.current = window.scrollY;
      setLocked(true);
    }
  }, [locked]);

  const unlockScroll = useCallback(() => {
    if (locked) {
      const savedPosition = scrollOffset.current;
      setLocked(false);

      requestAnimationFrame(() => {
        window.scrollTo(0, savedPosition);
      });
    }
  }, [locked]);

  useEffect(() => {
    if (!locked) return;

    return () => {
      setLocked(false);

      requestAnimationFrame(() => {
        window.scrollTo(0, scrollOffset.current);
      });
    };
  }, [locked]);

  const ScrollLockComponent = useCallback(
    () => (
      <GlobalScrollLock
        isLocked={locked}
        scrollPosition={scrollOffset.current}
      />
    ),
    [locked]
  );

  return {
    ScrollLockComponent,
    lockScroll,
    unlockScroll,
    isLocked: locked
  };
}
