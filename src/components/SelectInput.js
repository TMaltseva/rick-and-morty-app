import styled, { css } from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import { ReactComponent as CloseIcon } from '../assets/icons/CrossIcon.svg';
import { ReactComponent as ChevronIcon } from '../assets/icons/ShevronIcon.svg';

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
              <StyledCloseIcon />
            </ClearButton>
          ) : (
            <ChevronContainer $isOpen={isOpen}>
              <StyledChevronIcon $hasValue={!!value} />
            </ChevronContainer>
          )}
        </SelectButton>

        {isOpen && (
          <OptionsList>
            {options.map((option) => (
              <OptionItem
                key={option}
                onClick={() => handleSelect(option)}
                $isSelected={option === value}
                title={option}
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
  width: 180px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;

  @media (max-width: 950px) {
    width: 150px;
  }

  @media (max-width: 530px) {
    width: 240px;
  }
`;

const SelectWrapper = styled.div`
  position: relative;
`;

const SelectButton = styled.div`
  position: relative;
  padding: 12px 36px 12px 16px;
  background: #263750;
  border: 1px solid #83bf46;
  border-radius: 8px;
  color: ${({ $hasValue }) => ($hasValue ? '#fff' : '#b3b3b3')};
  cursor: pointer;
  transition: all 0.3s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  box-sizing: border-box;

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
  list-style: none;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  z-index: 1000;
  margin: 0;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  &::-webkit-scrollbar {
    width: 12px;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    border-radius: 4px;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-right: 4px solid transparent;
    background-clip: content-box;
    min-height: 20px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #d9d9d9;
    background-clip: content-box;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 4px;
  }

  scrollbar-width: thin;
  scrollbar-color: #d9d9d9 transparent;

  overflow-y: scroll;
`;

const OptionItem = styled.li`
  display: block;
  min-height: 30px;
  padding: 8px;
  color: #1e1e1e;
  cursor: pointer;
  transition: all 0.3s;
  align-items: center;
  list-style: none;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  box-sizing: border-box;
  word-break: break-all;

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
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s;

  &:hover {
    color: #83bf46;
  }
`;

const ChevronContainer = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  pointer-events: none;
  padding: 6px 4px;

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      transform: translateY(-50%) rotate(180deg);
    `}
`;

const StyledChevronIcon = styled(ChevronIcon)`
  path {
    stroke: ${({ $hasValue }) => ($hasValue ? '#fff' : '#b2b2b2')};
    transition: stroke 0.3s;
  }

  ${SelectButton}:hover & path {
    stroke: ${({ $hasValue }) => ($hasValue ? '#fff' : '#b2b2b2')};
  }
`;

const StyledCloseIcon = styled(CloseIcon)`
  path {
    stroke: #fff;
    transition: stroke 0.3s;
  }

  ${ClearButton}:hover & path {
    stroke: #83bf46;
  }
`;
