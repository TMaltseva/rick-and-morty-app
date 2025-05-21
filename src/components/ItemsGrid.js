import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Popup } from './popup';
import { useData } from './providers';
import { Card } from './Card';

const defaultPopupSettings = {
  visible: false,
  content: {}
};

export function ItemsGrid() {
  const { characters } = useData();
  const [popupState, setPopupState] = useState(defaultPopupSettings);

  const getCardClickHandler = useCallback(
    (props) => () => {
      setPopupState({
        visible: true,
        content: { ...props }
      });
    },
    []
  );

  return (
    <Container>
      {characters.map((character) => (
        <Card
          key={character.id}
          onClickHandler={getCardClickHandler(character)}
          {...character}
        />
      ))}

      <Popup settings={popupState} setSettings={setPopupState} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-items: center;
  gap: 30px;
`;
