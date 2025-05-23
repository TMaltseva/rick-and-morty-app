import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../api-config';

export function useFiltersData() {
  const [options, setOptions] = useState({
    status: [],
    gender: [],
    species: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    let allCharacters = [];
    let nextPage = API_URL;

    const fetchNextPage = (url) => {
      axios
        .get(url)
        .then((response) => {
          allCharacters = [...allCharacters, ...response.data.results];
          if (response.data.info.next) {
            fetchNextPage(response.data.info.next);
          } else {
            const statuses = [...new Set(allCharacters.map((c) => c.status))]
              .filter((s) => s)
              .sort();
            const genders = [...new Set(allCharacters.map((c) => c.gender))]
              .filter((g) => g)
              .sort();
            const species = [...new Set(allCharacters.map((c) => c.species))]
              .filter((s) => s)
              .sort();

            setOptions({
              status: statuses,
              gender: genders,
              species: species
            });
          }
        })
        .catch((error) => {
          setError(error);
          console.error('Error fetching filter options:', error);
        })
        .finally(() => setIsLoading(false));
    };

    fetchNextPage(nextPage);
  }, []);

  return { options, isLoading, error };
}
