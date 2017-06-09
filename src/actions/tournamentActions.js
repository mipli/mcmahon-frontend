import {createAction} from 'redux-actions';
import Axios from 'axios';

const apiServer = Axios.create({
  baseURL: 'http://localhost:4000'
});

export const fetchTournamentSuccess = createAction('FETCH_TOURNAMENT_SUCCESS');
export const fetchTournament = (tournament) => {
  return (dispatch) => {
    return apiServer({
      url: '/tournaments/' + tournament._id,
      method: 'GET'
    }).then((response) => {
      dispatch(fetchTournamentSuccess(response.data));
    });
  };
};

export const fetchTournamentsSuccess = createAction('FETCH_TOURNAMENTS_SUCCESS');
export const fetchTournaments = () => {
  return (dispatch) => {
    return apiServer('/tournaments')
      .then(response => {
        dispatch(fetchTournamentsSuccess(response.data));
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const createTournamentSuccess = createAction('CREATE_TOURNAMENT_SUCCESS');
export const createTournament = (name) => {
  return (dispatch) => {
    return apiServer({url: '/tournaments', method: 'POST', data: {name: name} })
      .then(response => {
        dispatch(createTournamentSuccess(response.data));
      })
      .catch(error => {
        throw(error);
      });
  };
};
