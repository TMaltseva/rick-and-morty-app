import styled, { css } from 'styled-components';
import { useState, useRef, useEffect } from 'react';

export function SelectInput({ label, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <SelectContainer ref={selectRef}>
      <SelectWrapper>
        <SelectButton
          onClick={() => setIsOpen(!isOpen)}
          $hasValue={!!value}
          $isOpen={isOpen}
        >
          {value || label}
          {value ? (
            <ClearButton
              onClick={(e) => {
                e.stopPropagation();
                onChange('');
              }}
            >
              ×
            </ClearButton>
          ) : (
            <ChevronIcon $hasValue={!!value} $isOpen={isOpen} />
          )}
        </SelectButton>

        {isOpen && (
          <OptionsList>
            {options.map((option) => (
              <OptionItem
                key={option}
                onClick={() => handleSelect(option)}
                $isSelected={option === value}
              >
                {option}
              </OptionItem>
            ))}
          </OptionsList>
        )}
      </SelectWrapper>
    </SelectContainer>
  );
}

const SelectContainer = styled.div`
  min-width: 180px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;

  @media (max-width: 950px) {
    min-width: 150px;
  }

  @media (max-width: 530px) {
    width: 100%;
    min-width: auto;
  }
`;

const SelectWrapper = styled.div`
  position: relative;
`;

const SelectButton = styled.div`
  position: relative;
  padding: 10px 15px;
  background: #263750;
  border: 1px solid #83bf46;
  border-radius: 8px;
  color: ${({ $hasValue }) => ($hasValue ? '#fff' : '#b3b3b3')};
  cursor: pointer;
  transition: all 0.3s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    background: #334466;
  }
`;

const OptionsList = styled.ul`
  position: absolute;
  top: 110%;
  left: 0;
  right: 0;
  max-height: 158px;
  padding: 0;
  list-style: none;
  overflow-y: auto;
  background: #d9d9d9;
  border-radius: 8px;
  z-index: 1000;
  margin: 0;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const OptionItem = styled.li`
  line-height: 22px;
  padding: 8px;
  color: #1e1e1e;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      font-weight: bold;
    `}

  &:hover {
    background: rgba(131, 191, 70, 0.2);
  }
`;

const ClearButton = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  line-height: 1;
  padding: 0 5px;
  cursor: pointer;

  &:hover {
    color: #83bf46;
  }
`;

const ChevronIcon = styled.span`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid ${({ $hasValue }) => ($hasValue ? '#fff' : '#b3b3b3')};
  transition: transform 0.3s;
  transform: ${({ $isOpen }) =>
    $isOpen
      ? 'translateY(-50%) rotate(180deg)'
      : 'translateY(-50%) rotate(0deg)'};
`;
