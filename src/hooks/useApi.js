import { useState, useEffect } from 'react';
import { api } from '../utils/api';

const useApi = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { method = 'GET', body = null, dependencies = [] } = options;

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let result;
      switch (method.toUpperCase()) {
        case 'GET':
          result = await api.get(endpoint);
          break;
        case 'POST':
          result = await api.post(endpoint, body);
          break;
        case 'PUT':
          result = await api.put(endpoint, body);
          break;
        case 'DELETE':
          result = await api.delete(endpoint);
          break;
        default:
          throw new Error(`Unsupported HTTP method: ${method}`);
      }
      
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
};

export default useApi; 