import styled, { css } from 'styled-components';

const withShadow = css`
  position: relative;
  &::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 45px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    background-color: ${({ theme }) => theme.color.white[0]};
    z-index: -1;
  }
`;

export const fixedWrapper = css`
  position: fixed;
  width: 94%;
  max-width: 400px;
  min-height: 80px;
  grid-template-rows: auto 40px;
  left: 50%;
  top: 50%;
  margin: 0px auto;
  border-radius: 40px;
  ${withShadow}
`;
export const stickyWrapper = css`
  width: 94%;
  min-height: 80px;
  margin: 0px auto;
  border-radius: 40px;
  ${withShadow}
`;

export const ChildrensStyles = styled.div`
  padding: 10px;
`;

export const Controllers = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 5%;
`;
