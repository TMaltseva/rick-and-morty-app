import styled from 'styled-components';
import { useEffect, useCallback } from 'react';
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

  const handleSelectChange = useCallback(
    (field) => (value) =>
      setDraftFilters((prev) => ({ ...prev, [field]: value })),
    [setDraftFilters]
  );

  const handleInputChange = useCallback(
    (field) => (e) =>
      setDraftFilters((prev) => ({ ...prev, [field]: e.target.value })),
    [setDraftFilters]
  );

  const handleApply = useCallback(() => {
    applyFilters(draftFilters);
  }, [applyFilters, draftFilters]);

  const handleReset = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

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
          onChange={handleSelectChange('status')}
        />
        <SelectInput
          label="Gender"
          options={filterOptions.gender}
          value={draftFilters.gender}
          onChange={handleSelectChange('gender')}
        />
        <SelectInput
          label="Species"
          options={filterOptions.species}
          value={draftFilters.species}
          onChange={handleSelectChange('species')}
        />
      </FilterGroup>

      <FilterGroup>
        <TextInput
          placeholder="Name"
          value={draftFilters.name}
          onChange={handleInputChange('name')}
        />
        <TextInput
          placeholder="Type"
          value={draftFilters.type}
          onChange={handleInputChange('type')}
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
