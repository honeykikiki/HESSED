import { useState, useCallback } from 'react';

export default function useinput(initialValue = null) {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return [value, handler, setValue];
}
