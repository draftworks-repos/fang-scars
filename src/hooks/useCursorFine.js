import { useMediaQuery } from './useMediaQuery';

export function useCursorFine() {
  const isFine = useMediaQuery('(pointer: fine) and (hover: hover)');
  return isFine;
}

export default useCursorFine;
