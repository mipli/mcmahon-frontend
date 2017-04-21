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
