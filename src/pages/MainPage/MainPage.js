import React from 'react';
import styled from 'styled-components';
import WithMenuTemplate from 'templates/WithMenuTemplate';

import RoomsPanel from './RoomsPanel';
import Dashboard from './Dashboard';

const Wrapper = styled.div`
  display: grid;
  width: 600px;
`;

const MainPage = () => {
  return (
    <WithMenuTemplate>
      <Wrapper>
        <RoomsPanel />
        <Dashboard />
      </Wrapper>
    </WithMenuTemplate>
  );
};

export default MainPage;
