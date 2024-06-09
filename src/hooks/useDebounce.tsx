import { useEffect, useState } from "react";

export const useDebounce = (searchInput: string, time = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState(searchInput);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(searchInput);
    }, time);
    return () => clearTimeout(timeout);
  }, [searchInput, time]);
  return debouncedValue;
};
