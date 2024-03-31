import { useEffect, useState } from "react";

/**
 *
 * @param {url of api} url
 * @param  {...} restParams
 * @returns response received from API
 */

const useFetch = (url, ...restParams) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [url, ...restParams]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetch(url, ...restParams);
      const json = await data.json();
      const response = json.data;
      setData(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return { data, error, loading };
};

export default useFetch;
