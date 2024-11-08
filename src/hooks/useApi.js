// hooks/useApi.js
import { useState, useCallback } from 'react';
import axios from 'axios';

const { VITE_BACKEND_URL } = import.meta.env;
import api from '../config/axios';

/**
 * useApi - A custom React hook for making API requests with Axios.
 *
 * @param {string} [endpoint=''] - The API endpoint to call (relative to the backend URL).
 * @param {('GET'|'POST'|'PUT'|'DELETE'|'PATCH')} [method='GET'] - HTTP method to use.
 * @param {Object|null} [requestData=null] - Data to send with the request (for POST, PUT, etc.).
 * @param {boolean} [autoFetch=false] - Whether to fetch the data automatically on mount.
 *
 * @returns {Object} - The hook returns the following properties:
 * @property {any} data - The data returned from the API.
 * @property {Error|null} error - Any error encountered during the API call.
 * @property {boolean} loading - Whether the request is currently loading.
 * @property {Function} refetch - Function to manually re-trigger the API call.
 *    @param {string} [newEndpoint] - Optional new endpoint for the request.
 *    @param {Object} [newConfig] - Optional new Axios config for the request.
 *
 * @example
 * // Example usage of useApi to fetch user data
 * const { data, loading, error, refetch } = useApi('/v1/users/profile', 'GET');
 *
 * if (loading) return <p>Loading...</p>;
 * if (error) return <p>Error: {error.message}</p>;
 *
 * return <div>
 *   <h1>{data.name}</h1>
 *   <p>Email: {data.email}</p>
 * </div>;
 */
const useApi = (endpoint = '', method = 'GET', requestData = null) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Create the API URL
  const url = VITE_BACKEND_URL + endpoint;

  // Fetch data using useCallback to ensure it doesn't recreate on every render
  const fetchData = useCallback(
    async (customUrl, customConfig = { method, data: requestData }) => {
      setLoading(true);
      setError(null);

      try {
        const response = await api({
          url: customUrl ? customUrl : url,
          method,
          ...customConfig,
        });
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [url, method, requestData]
  );

  return { data, error, loading, refetch: fetchData };
};

export default useApi;