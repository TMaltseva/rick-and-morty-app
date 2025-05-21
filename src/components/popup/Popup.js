import { useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { PopupEpisodes } from './PopupEpisodes';
import { PopupHeader } from './PopupHeader';
import { PopupInfo } from './PopupInfo';
import { useScrollLock } from './hooks/useScrollLock';

export function Popup({ settings: { visible, content = {} }, setSettings }) {
  const {
    name,
    gender,
    image,
    status,
    species,
    type,
    origin,
    location,
    episode: episodes
  } = content;

  const { ScrollLockComponent, lockScroll, unlockScroll } = useScrollLock();

  const openPopup = useCallback(() => {
    setSettings((prev) => ({ ...prev, visible: true }));
  }, [setSettings]);

  const closePopup = useCallback(() => {
    setSettings((prev) => ({ ...prev, visible: false }));
  }, [setSettings]);

  const togglePopup = useCallback(
    (e) => {
      if (e.currentTarget !== e.target) {
        return;
      }

      if (visible) {
        closePopup();
      } else {
        openPopup();
      }
    },
    [visible, closePopup, openPopup]
  );

  const handleEscapeKey = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        closePopup();
      }
    },
    [closePopup]
  );

  const handlePopupClick = useCallback((e) => e.stopPropagation(), []);

  useEffect(() => {
    if (visible) {
      lockScroll();
      document.addEventListener('keydown', handleEscapeKey);
    } else {
      unlockScroll();
      document.removeEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [visible, lockScroll, unlockScroll, handleEscapeKey]);

  return (
    <>
      <ScrollLockComponent />
      <PopupContainer visible={visible} onClick={togglePopup}>
        <StyledPopup onClick={handlePopupClick}>
          <CloseIcon onClick={closePopup} />
          <PopupHeader
            name={name}
            gender={gender}
            image={image}
            status={status}
            species={species}
            type={type}
          />
          <PopupInfo origin={origin} location={location} />
          <PopupEpisodes episodes={episodes} />
        </StyledPopup>
      </PopupContainer>
    </>
  );
}

const PopupContainer = styled.div`
  position: fixed;
  z-index: 10;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  color: #fff;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.3s, visibility 0.3s;

  ${({ visible }) =>
    visible &&
    css`
      opacity: 1;
      visibility: visible;
      pointer-events: all;
    `}
`;

const StyledPopup = styled.div`
  position: relative;
  width: 40%;
  margin: 0 auto;
  height: auto;
  max-height: 90vh;
  margin-top: calc(10vh - 20px);
  background: #263750;
  border-radius: 15px;
  padding: 20px 40px;
  border: 2px solid #83bf46;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 930px) {
    width: 80%;
  }

  @media (max-width: 600px) {
    width: 95%;
  }
`;

const CloseIcon = styled.div`
  cursor: pointer;
  position: fixed;
  right: calc(30% - 10px);
  top: calc(10vh - 30px);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #83bf46aa;

  &:before,
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 20px;
    height: 2px;
    background: #fff;
  }

  &:before {
    left: 4.5px;
    transform: rotate(-45deg);
  }

  &:after {
    right: 4.5px;
    transform: rotate(45deg);
  }

  @media (max-width: 930px) {
    right: calc(10% - 10px);
  }

  @media (max-width: 600px) {
    right: calc(3% - 10px);
  }
`;
