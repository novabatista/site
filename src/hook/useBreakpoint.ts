'use client';

import { useState, useEffect, useMemo } from 'react';

export enum BreakpointEnum {
  base = "base",
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
  xl2 = "2xl",
}

const BreakpointEnumSize = {
  [BreakpointEnum.base]: 0,
  [BreakpointEnum.sm]: 640,
  [BreakpointEnum.md]: 768,
  [BreakpointEnum.lg]: 1024,
  [BreakpointEnum.xl]: 1280,
  [BreakpointEnum.xl2]: 1536,
};

type BreakpointEntry = {
  label: string;
  size: number;
};

export type MatcherEntries = Partial<Record<BreakpointEnum, any>>;

function getBreakpointForWidth(windowWidth: number): BreakpointEntry {
  let curBreakpointLabel = BreakpointEnum.base;
  let curBreakpointSize = 0;
  let biggestBreakpointValue = 0;

  for (const [breakpoint, size] of Object.entries(BreakpointEnumSize)) {
    if (size > biggestBreakpointValue && windowWidth >= size) {
      biggestBreakpointValue = size;
      curBreakpointLabel = breakpoint as BreakpointEnum;
      curBreakpointSize = size;
    }
  }

  return {
    label: curBreakpointLabel,
    size: curBreakpointSize,
  };
}

export default function useBreakpoint() {
  const initialBreakpoint = useMemo(() => {
    if (typeof window === 'undefined') {
      return { label: BreakpointEnum.base, size: 0 };
    }
    return getBreakpointForWidth(window.innerWidth);
  }, []);

  const [current, setCurrent] = useState<BreakpointEntry>(initialBreakpoint);

  const [is, setIs] = useState<Record<BreakpointEnum, boolean>>(() => {
    const initialIs = {
      [BreakpointEnum.base]: false,
      [BreakpointEnum.sm]: false,
      [BreakpointEnum.md]: false,
      [BreakpointEnum.lg]: false,
      [BreakpointEnum.xl]: false,
      [BreakpointEnum.xl2]: false,
    };

    if (initialBreakpoint.label) {
      initialIs[initialBreakpoint.label as BreakpointEnum] = true;
    }

    return initialIs;
  });

  const getCurrentBreakpoint = (): BreakpointEntry => {
    return current;
  };

  const updateBreakpoint = () => {
    if (typeof window === 'undefined') return;

    const bp = getBreakpointForWidth(window.innerWidth);

    setCurrent(bp);
    setIs({
      [BreakpointEnum.base]: false,
      [BreakpointEnum.sm]: false,
      [BreakpointEnum.md]: false,
      [BreakpointEnum.lg]: false,
      [BreakpointEnum.xl]: false,
      [BreakpointEnum.xl2]: false,
      [bp.label as BreakpointEnum]: true,
    });
  };

  /**
   * Match responsive values based on the current breakpoint
   *
   * Examples:
   * ```
   * matcher({sm: 1, md: 2})
   * matcher({lg: 'foo', md: 'bar', 'sm': 'baz'})
   * matcher({sm: ()=>{someprocessing})
   * ```
   * */
  const matcher = (entries: MatcherEntries) => {
    const breakpointOrder = [
      BreakpointEnum.base,
      BreakpointEnum.sm,
      BreakpointEnum.md,
      BreakpointEnum.lg,
      BreakpointEnum.xl,
      BreakpointEnum.xl2,
    ];

    const currentIndex = breakpointOrder.indexOf(current.label as BreakpointEnum);

    let result = entries?.[BreakpointEnum.base];

    for (let i = 0; i <= currentIndex; i++) {
      const bp = breakpointOrder[i];
      if (entries[bp] !== undefined) {
        result = entries[bp];
      }
    }

    return result;
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener("resize", updateBreakpoint);

      return () => {
        window.removeEventListener("resize", updateBreakpoint);
      };
    }
  }, []);

  return {
    is,
    current,
    getCurrentBreakpoint,
    matcher,
  };
}