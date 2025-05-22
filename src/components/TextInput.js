import styled from 'styled-components';

export function TextInput({ value, onChange, placeholder }) {
  return (
    <InputContainer>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </InputContainer>
  );
}

const InputContainer = styled.div`
  width: 180px;

  @media (max-width: 950px) {
    width: 150px;
  }

  @media (max-width: 530px) {
    width: 100%;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  background: #263750;
  border: 1px solid #4a596b;
  border-radius: 8px;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #83bf46;
    box-shadow: 0 0 0 2px #83bf4633;
  }

  &::placeholder {
    color: #6b7b8f;
  }

  &:invalid {
    border-color: #ff5152;
  }
`;
