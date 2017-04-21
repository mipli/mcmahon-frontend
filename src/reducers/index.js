// Set up your root reducer here...
import { combineReducers } from 'redux';
import players from './playerReducers';
import rounds from './roundsReducers';
import tournaments from './tournamentsReducers';
import tournament from './tournamentReducers';

export default combineReducers({
  players: players,
  tournaments: tournaments,
  tournament: tournament
});
