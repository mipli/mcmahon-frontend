// Set up your root reducer here...
import { combineReducers } from 'redux';
import tournaments from './tournamentsReducers';
import tournament from './tournamentReducers';

export default combineReducers({
  tournaments: tournaments,
  tournament: tournament
});
