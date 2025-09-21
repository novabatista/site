'use client';

import { useState, useEffect } from 'react';

enum BreakpointEnum {
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

export default function useBreakpoint() {
  const [current, setCurrent] = useState<BreakpointEntry>({
    label: "",
    size: 0,
  });

  const [is, setIs] = useState<Record<BreakpointEnum, boolean>>({
    [BreakpointEnum.sm]: false,
    [BreakpointEnum.md]: false,
    [BreakpointEnum.lg]: false,
    [BreakpointEnum.xl]: false,
    [BreakpointEnum.xl2]: false,
    [BreakpointEnum.base]: false,
  });

  const getCurrentBreakpoint = (): BreakpointEntry => {
    if (typeof window === 'undefined') {
      return { label: BreakpointEnum.base, size: 0 };
    }

    let curBreakpointLabel = BreakpointEnum.base;
    let curBreakpointSize = 0;
    let biggestBreakpointValue = 0;

    const windowWidth = window.innerWidth;

    for (const [breakpoint, size] of Object.entries(BreakpointEnumSize)) {
      if (size > biggestBreakpointValue && windowWidth >= size) {
        biggestBreakpointValue = size;
        curBreakpointLabel = breakpoint as BreakpointEnum;
        curBreakpointSize = size;
      } else if (windowWidth < BreakpointEnumSize[BreakpointEnum.sm]) {
        curBreakpointLabel = BreakpointEnum.base;
        curBreakpointSize = 0;
        break;
      }
    }

    return {
      label: curBreakpointLabel,
      size: curBreakpointSize,
    };
  };

  const isBreakpoint = (targetBP: BreakpointEnum, actualBP: string): boolean => {
    return targetBP === actualBP;
  };

  const updateBreakpoint = () => {
    const bp = getCurrentBreakpoint();

    setCurrent(bp);
    setIs({
      [BreakpointEnum.base]: isBreakpoint(BreakpointEnum.base, bp.label),
      [BreakpointEnum.sm]: isBreakpoint(BreakpointEnum.sm, bp.label),
      [BreakpointEnum.md]: isBreakpoint(BreakpointEnum.md, bp.label),
      [BreakpointEnum.lg]: isBreakpoint(BreakpointEnum.lg, bp.label),
      [BreakpointEnum.xl]: isBreakpoint(BreakpointEnum.xl, bp.label),
      [BreakpointEnum.xl2]: isBreakpoint(BreakpointEnum.xl2, bp.label),
    });
  };

  /**
   * ```
   * breakpointMatcher({sm: 1, md: 2})
   * breakpointMatcher({lg: 'foo', md: 'bar', 'sm': 'baz'})
   * breakpointMatcher({sm: ()=>{someprocessing})
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
      updateBreakpoint();

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