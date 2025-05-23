import styled from 'styled-components';
import { useEffect } from 'react';
import { API_URL } from '../../api-config';
import { useData } from '../providers';
import { SelectInput } from '../SelectInput';
import { TextInput } from '../TextInput';
import { Button } from '../Button';
import { useFiltersData } from './hooks/useFiltersData';
import { useUrlSync } from './hooks/useUrlSync';
import { Text } from '../common';

const initialFilters = {
  status: '',
  gender: '',
  species: '',
  name: '',
  type: ''
};

export function Filters() {
  const { setApiURL, setActivePage } = useData();
  const { options: filterOptions, isLoading, error } = useFiltersData();
  const {
    appliedFilters,
    draftFilters,
    setDraftFilters,
    applyFilters,
    resetFilters,
    hasUnappliedChanges
  } = useUrlSync(initialFilters);

  useEffect(() => {
    const params = new URLSearchParams();

    Object.entries(appliedFilters).forEach(([key, value]) => {
      if (value && value.trim() !== '') {
        params.set(key, value);
      }
    });

    const newApiUrl = params.toString()
      ? `${API_URL}?${params.toString()}`
      : API_URL;

    setApiURL(newApiUrl);
    setActivePage(0);
  }, [appliedFilters, setApiURL, setActivePage]);

  const handleApply = () => {
    applyFilters(draftFilters);
  };

  const handleReset = () => {
    resetFilters();
  };

  const handleFilterChange = (key, value) => {
    setDraftFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  if (isLoading) {
    return (
      <FiltersContainer>
        <Text color="#83bf46">Loading filters...</Text>
      </FiltersContainer>
    );
  }

  if (error) {
    return (
      <FiltersContainer>
        <Text color="#fff">Failed to load filters.</Text>
      </FiltersContainer>
    );
  }

  return (
    <FiltersContainer>
      <FilterGroup>
        <SelectInput
          label="Status"
          options={filterOptions.status}
          value={draftFilters.status}
          onChange={(v) => handleFilterChange('status', v)}
        />
        <SelectInput
          label="Gender"
          options={filterOptions.gender}
          value={draftFilters.gender}
          onChange={(v) => handleFilterChange('gender', v)}
        />
        <SelectInput
          label="Species"
          options={filterOptions.species}
          value={draftFilters.species}
          onChange={(v) => handleFilterChange('species', v)}
        />
      </FilterGroup>

      <FilterGroup>
        <TextInput
          placeholder="Name"
          value={draftFilters.name}
          onChange={(e) => handleFilterChange('name', e.target.value)}
        />
        <TextInput
          placeholder="Type"
          value={draftFilters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
        />
        <Actions>
          <Button onClick={handleApply} disabled={!hasUnappliedChanges}>
            Apply
          </Button>
          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </Actions>
      </FilterGroup>
    </FiltersContainer>
  );
}

const FiltersContainer = styled.div`
  display: grid;
  gap: 10px;
  padding: 20px;
  border-radius: 8px;

  @media (max-width: 950px) {
    gap: 15px;
    padding: 15px;
  }

  @media (max-width: 530px) {
    gap: 15px;
    padding: 10px;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto;

  @media (max-width: 530px) {
    flex-direction: column;
    width: 100%;
    margin-left: 0;
    gap: 15px;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: no-wrap;
  align-items: flex-start;
  font-family: 'Inter', sans-serif;

  @media (max-width: 950px) {
    gap: 15px;
  }

  @media (max-width: 530px) {
    flex-direction: column;
    gap: 15px;
    width: 100%;

    ${Actions} {
      width: 100%;
      button {
        width: 100%;
      }
    }
  }
`;
