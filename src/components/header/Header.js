import styled from 'styled-components';
import { Logo } from './Logo';
import { Filters } from '../filters/Filters';

export function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <Filters />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 0;
  justify-content: space-between;

  @media (max-width: 950px) {
    flex-direction: column;
    align-items: center;
  }
`;
