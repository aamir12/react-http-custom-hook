import  { useState,useCallback } from 'react';

const useHttp = () => {
  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState(false);

  const sendRequest = useCallback (async (requestConfig,applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        requestConfig.url,
        {
          method : requestConfig.method ? requestConfig.method  : 'GET',
          body : requestConfig.body ? JSON.stringify(requestConfig.body):  null,
          headers: requestConfig.headers ? requestConfig.headers : {},
        }
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      applyData(data);

    } catch (error) {
      setError(error.message || 'Something went wrong!');
      throw error;
    } finally {
      setIsLoading(false);
    }
    
  },[])

  return {isLoading,error,sendRequest};
  
}

export default useHttp;
