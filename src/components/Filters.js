import styled from 'styled-components';
import { useState } from 'react';
import { API_URL } from '../api-config';
import { useData } from './providers';
import { SelectInput } from './SelectInput';
import { TextInput } from './TextInput';
import { Button } from './Button';

export function Filters() {
  const { setApiURL } = useData();
  const [filters, setFilters] = useState({
    status: '',
    gender: '',
    species: '',
    name: '',
    type: ''
  });

  const handleApply = () => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    setApiURL(`${API_URL}?${params.toString()}`);
  };

  const handleReset = () => {
    setFilters({
      status: '',
      gender: '',
      species: '',
      name: '',
      type: ''
    });
    setApiURL(API_URL);
  };

  return (
    <FiltersContainer>
      <FilterGroup>
        <SelectInput
          label="Status"
          options={['Alive', 'Dead', 'unknown']}
          value={filters.status}
          onChange={(v) => setFilters((p) => ({ ...p, status: v }))}
        />
        <SelectInput
          label="Gender"
          options={['Female', 'Male', 'Genderless', 'unknown']}
          value={filters.gender}
          onChange={(v) => setFilters((p) => ({ ...p, gender: v }))}
        />
        <SelectInput
          label="Species"
          options={['Human', 'Alien', 'Robot', 'Animal']}
          value={filters.species}
          onChange={(v) => setFilters((p) => ({ ...p, species: v }))}
        />
      </FilterGroup>

      <FilterGroup>
        <TextInput
          placeholder="Name"
          value={filters.name}
          onChange={(e) => setFilters((p) => ({ ...p, name: e.target.value }))}
        />
        <TextInput
          placeholder="Type"
          value={filters.type}
          onChange={(e) => setFilters((p) => ({ ...p, type: e.target.value }))}
        />
        <Actions>
          <Button onClick={handleApply}>Apply</Button>
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
  gap: 20px;
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
