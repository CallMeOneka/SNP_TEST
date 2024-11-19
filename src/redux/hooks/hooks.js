import { useMemo, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

export const useCustomSelector = (func, params = {}) => {
  const saved = useRef(func);

  useEffect(() => {
    saved.current = func;
  }, [params, func]);

  return useSelector((state) => saved.current(state, params));
};
