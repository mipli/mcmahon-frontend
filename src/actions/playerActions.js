import {createAction} from 'redux-actions';
import Axios from 'axios';

const apiServer = Axios.create({
  baseURL: 'http://localhost:4000/'
});

export const fetchPlayersSuccess = createAction('FETCH_PLAYERS_SUCCESS');
export const registerPlayerSuccess = createAction('REGISTER_PLAYER_SUCCESS');
export const updatePlayerSuccess = createAction('UPDATE_PLAYER_SUCCESS');
export const deletePlayerSuccess = createAction('DELETE_PLAYER_SUCCESS');

export const fetchPlayers = () => {
  return (dispatch) => {
    return apiServer('/players')
      .then(response => {
        dispatch(fetchPlayersSuccess(response.data));
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const registerPlayer = (player) => {
  return (dispatch) => {
    delete player._id;
    return apiServer({url: '/players/', method: 'post', data: player})
      .then(response => {
        const player = response.data;
        dispatch(registerPlayerSuccess(player));
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const updatePlayer = (player) => {
  return (dispatch) => {
    return apiServer({url: '/players/' + player._id, method: 'put', data: player})
      .then(response => {
        const player = response.data;
        dispatch(updatePlayerSuccess(player));
      })
      .catch(error => {
        throw(error);
      });
  };
};


export const deletePlayer = (player) => {
  return (dispatch) => {
    return apiServer({url: '/players/' + player._id, method: 'delete'})
      .then(() => {
        dispatch(deletePlayerSuccess(player));
      })
      .catch(error => {
        throw(error);
      });
  };
};
