import { useState, useCallback } from 'react';

export default function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (url, opts, applyData, handleErr) => {
    setIsLoading(true);
    setError(null);

    if (opts) {
      opts.credentials = import.meta.env.DEV ? 'include' : 'same-origin';
    } else {
      opts = {
        method: 'GET',
        credentials: import.meta.env.DEV ? 'include' : 'same-origin',
      }
    }
    try {
      const response = await fetch(url, opts);
      const data = await response.json();
      applyData && applyData(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
      handleErr && handleErr(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {isLoading, error, sendRequest}
}