import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Home from './components/common/HomePage';
import Help from './components/common/HelpPage';
import Player from './components/player/PlayerPage';
import Rounds from './components/rounds/RoundsPage';
import App from './components/App';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/rounds(/:roundNumber)" component={Rounds} />
    <Route path="/players(/:playerId)" component={Player} />
    <Route path="/help" component={Help} />
  </Route>
);
