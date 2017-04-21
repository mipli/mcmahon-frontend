import {createAction} from 'redux-actions';
import Axios from 'axios';

const apiServer = Axios.create({
  baseURL: 'http://localhost:4000'
});


export const updatePairingResultSuccess = createAction('UPDATE_PAIRING_RESULT_SUCCESS');

export const updatePairingResult = (tournamentId, roundId, pairingId, result) => {
  return (dispatch) => {
    return apiServer({
      url: '/tournaments/' + tournamentId + '/rounds/' + roundId + '/pairing/' + pairingId,
      method: 'PUT',
      data: {
        result: result
      }
    })
      .then(response => {
        dispatch(updatePairingResultSuccess(response.data));
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const drawRoundSuccess = createAction('DRAW_ROUND_SUCCESS');

export const drawRound = (tournamentId) => {
  return (dispatch) => {
    return apiServer('/tournaments/' + tournamentId + '/rounds/draw')
      .then(response => {
        dispatch(drawRoundSuccess(response.data));
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const redrawRoundSuccess = createAction('REDRAW_ROUND_SUCCESS');

export const redrawRound = (tournamentId) => {
  return (dispatch) => {
    return apiServer('/tournaments/' + tournamentId + '/rounds/redraw')
      .then(response => {
        dispatch(redrawRoundSuccess(response.data));
      })
      .catch(error => {
        throw(error);
      });
  };
};
