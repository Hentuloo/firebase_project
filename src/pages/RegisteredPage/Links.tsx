import React, { FC } from 'react';
import styled from 'styled-components';

import { stickyModal } from 'components/molecules';
import { Link } from 'react-router-dom';
import { BarDecoratorForLink } from 'components/atoms';

import multiPlayerImage from 'assets/svg/ilustrations/multiplayerGlob.svg';
import levelsImage from 'assets/svg/ilustrations/levels.svg';
import { usePerspectiveAnimation } from 'hooks/usePerspectiveAnimation';
import { Constants } from 'config/Constants';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 10px;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  }
`;
const LinkWithImage = styled(Link)`
  display: grid;
  max-width: 450px;
  max-height: 320px;
  grid-template-rows: 80% 20%;
  text-decoration: none;

  ${({ theme }) => theme.mediaQuery.md} {
    height: 70%;
    align-self: center;
  }

  ${stickyModal}
  &::before {
    height: 100%;
  }
`;
const TitleOfLink = styled.span`
  ${BarDecoratorForLink}
  text-align: center;
  align-self: center;
  ${({ theme }) => theme.mediaQuery.vlg} {
    font-size: ${({ theme }) => theme.fs.s};
  }

  &::after {
    width: 40%;
    left: 65%;
  }
`;
const ImageWrapper = styled.div`
  text-align: center;
`;
const LinkImage = styled.img`
  max-height: 100%;
`;

const Links: FC = () => {
  const trainingRef = usePerspectiveAnimation<HTMLAnchorElement>();
  const multiplayerRef = usePerspectiveAnimation<HTMLAnchorElement>();
  return (
    <Wrapper>
      <LinkWithImage to={Constants.paths.solo.path} ref={trainingRef}>
        <ImageWrapper>
          <LinkImage src={levelsImage} />
        </ImageWrapper>
        <TitleOfLink>Zacznij trening solowy</TitleOfLink>
      </LinkWithImage>
      <LinkWithImage
        to={Constants.paths.dashboard.path}
        ref={multiplayerRef}
      >
        <ImageWrapper>
          <LinkImage src={multiPlayerImage} />
        </ImageWrapper>
        <TitleOfLink>Rywalizuj multiplayer</TitleOfLink>
      </LinkWithImage>
    </Wrapper>
  );
};

export default Links;
