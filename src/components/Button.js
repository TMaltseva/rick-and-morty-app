import styled from 'styled-components';

export function Button({ children, onClick, variant }) {
  return (
    <StyledButton onClick={onClick} $variant={variant}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  width: 85px;
  padding: 12px 13px;
  margin: 0;
  border: 1px solid
    ${({ $variant }) => ($variant === 'secondary' ? '#ff5152' : '#83bf46')};
  border-radius: 8px;
  background: transparent;
  color: ${({ $variant }) =>
    $variant === 'secondary' ? '#ff5152' : '#83bf46'};
  cursor: pointer;
  transition: all 0.3s;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  letter-spacing: 0.5px;

  &:hover {
    background: ${({ $variant }) =>
      $variant === 'secondary' ? '#ff5152' : '#83bf46'};
    color: #fff;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 950px) {
    width: 70px;
    padding: 10px 0;
  }

  @media (max-width: 530px) {
    width: 100%;
    padding: 12px 0;
  }
`;
