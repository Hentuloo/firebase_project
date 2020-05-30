import React, { FC } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Constants } from 'config/Constants';
import { BadAccurancyModal } from './BadAccurancyModal';

export const Modals: FC = () => {
  const { goBack } = useHistory();
  return (
    <Switch>
      <Route path={Constants.paths.soloBadAccurancy.path}>
        <BadAccurancyModal close={goBack} />
      </Route>
    </Switch>
  );
};
