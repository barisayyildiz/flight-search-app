import { useRef, useEffect } from "react";

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [ref]);

  return ref;
};

type useSortProps<T> = {
  data: T[];
  sortBy: keyof T;
  isAscending?: boolean;
};
