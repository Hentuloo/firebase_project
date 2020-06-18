import React, { FC } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Constants } from 'config/Constants';
import { BadAccuracyModal } from './BadAccuracyModal';

export const Modals: FC = () => {
  const { goBack } = useHistory();
  return (
    <Switch>
      <Route path={Constants.paths.soloBadAccuracy.path}>
        <BadAccuracyModal close={goBack} />
      </Route>
    </Switch>
  );
};
