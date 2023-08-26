import { useRef, useEffect, useState } from "react";

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
  data?: Array<T>,
  sortBy: keyof T,
  isAscending?: boolean
};

export const useSort = <T>({ data: initialData, sortBy, isAscending = true }: useSortProps<unknown>) => {
  const [data, setData] = useState<Array<unknown>>(initialData as Array<unknown>);
  const [key, setKey] = useState<keyof T>(sortBy);
  const [ascending, setAscending] = useState(isAscending);

  const sortedArray = data.sort((a, b) => {
    const valueA = (a as any)[key as keyof unknown];
    const valueB = (b as any)[key as keyof unknown];
    
    if (valueA < valueB) return ascending ? -1 : 1;
    if (valueA > valueB) return ascending ? 1 : -1;
    return 0;
  });
  
  const sort = (newKey: keyof T, newAscending: boolean = true) => {
    setKey(newKey);
    setAscending(newAscending);
  }

  return { sortedArray, sort };
}
