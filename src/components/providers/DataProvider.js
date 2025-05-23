import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback
} from 'react';
import axios from 'axios';
import { API_URL } from '../../api-config';

export function DataProvider({ children }) {
  const [activePage, setActivePage] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [apiURL, setApiURL] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  const fetchData = useCallback((url) => {
    setIsFetching(true);
    setIsError(false);

    axios
      .get(url)
      .then(({ data }) => {
        setIsFetching(false);
        setCharacters(data.results);
        setInfo(data.info);
      })
      .catch((e) => {
        setIsFetching(false);
        setIsError(true);
        console.error(e);
      });
  }, []);

  useEffect(() => {
    if (!isInitialized) {
      const params = new URLSearchParams(window.location.search);
      const initialUrl = params.toString()
        ? `${API_URL}?${params.toString()}`
        : API_URL;

      setApiURL(initialUrl);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  useEffect(() => {
    if (apiURL && isInitialized) {
      fetchData(apiURL);
    }
  }, [apiURL, fetchData, isInitialized]);

  const dataValue = useMemo(
    () => ({
      activePage,
      setActivePage,
      apiURL,
      setApiURL,
      characters,
      fetchData,
      isFetching,
      isError,
      info
    }),
    [activePage, apiURL, characters, isFetching, isError, info, fetchData]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

const DataContext = createContext({});

export const useData = () => useContext(DataContext);
