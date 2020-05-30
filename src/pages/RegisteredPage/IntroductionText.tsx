import React, { FC, useMemo } from 'react';
import styled from 'styled-components';

import smileSVG from 'assets/svg/icons/smile.svg';

import { stickyModal } from 'components/molecules';
import { CircleImage, BarDecorator } from 'components/atoms';
import { useSelector } from 'react-redux';
import { getUser } from 'store/selectors/user.selector';

const Wrapper = styled.div`
  max-width: 600px;
  align-self: center;
  grid-column: 1/-1;
  grid-column-gap: 20px;
  grid-row-gap: 10px;
  padding: 20px 10px;
  text-align: center;

  ${({ theme }) => theme.mediaQuery.md} {
    display: grid;
    grid-template-columns: 100px 1fr;
    grid-template-rows: auto auto;
  }

  ${stickyModal}
  &::before {
    top: 0%;
    left: 0%;
  }

  p:nth-of-type(1) {
    display: none;
    ${({ theme }) => theme.mediaQuery.md} {
      display: block;
      align-self: center;
    }
  }
`;
const StyledCirlceImage = styled(CircleImage)`
  display: none;

  ${({ theme }) => theme.mediaQuery.md} {
    display: block;
    grid-column: 1/2;
    grid-row: 1/2;
    margin: 0px auto;
  }

  &::after {
    display: none;
  }
`;

const Title = styled.h2`
  display: none;
  ${({ theme }) => theme.mediaQuery.md} {
    display: block;
    height: 30px;
    grid-column: 1/2;
    grid-row: 2/3;

    ${BarDecorator}
    &::after {
      width: 30%;
    }
  }
`;

const IntroductionText: FC = () => {
  const { displayName } = useSelector(getUser);
  const firstName = useMemo(() => {
    if (!displayName) return null;
    return displayName.split(' ')[0];
  }, [displayName]);
  return (
    <Wrapper>
      <StyledCirlceImage src={smileSVG} />
      <Title>Cześć!</Title>
      <p>
        {firstName ? `${firstName}, mamy` : 'Mamy'} nadzieje że
        spodoba ci się ta rozrywka, na dzień dzisiejszy nasza
        aplikacja jest w fazie testów
      </p>
      <p>
        Twoją nazwę i awatar mogą zobaczyć inni, zalecamy więc nie
        używać wulgarnych nazw oraz pozostać cierpliwym wobec
        zaistniałcyh błędów (te można zgłosić w zakładce ustawień)
      </p>
    </Wrapper>
  );
};

export default IntroductionText;
