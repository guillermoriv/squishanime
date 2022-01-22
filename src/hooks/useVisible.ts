import { MutableRefObject, useEffect, useRef, useState } from 'react';

export function useVisible(): {
  ref: MutableRefObject<null | any>;
  visible: boolean;
} {
  const [visible, setVisible] = useState<boolean>(true);
  const ref: MutableRefObject<null | any> = useRef(null);

  function handleClickOutside(event: Event) {
    if (ref.current.contains(event.target)) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible]);

  return { ref, visible };
}
