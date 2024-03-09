import React, { useCallback, useEffect } from 'react';
import styles from './style.css?inline';
import { sendMessageDebounce } from '../../utils';
import { Actions } from '../../enums';

export default function App() {
  const handleUIInteraction = useCallback(() => {
    sendMessageDebounce({
      type: Actions.USER_INTERACTION,
    });
  }, []);

  useEffect(() => {
    ['click', 'keydown', 'keyup', 'mousemove', 'scroll'].forEach((action) => {
      document.addEventListener(action, handleUIInteraction);
    });

    return () => {
      ['click', 'keydown', 'keyup', 'mousemove', 'scroll'].forEach((action) => {
        document.removeEventListener(action, handleUIInteraction);
      });
    };
  }, []);

  return null;
}
