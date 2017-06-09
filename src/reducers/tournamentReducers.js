export default (state = null, action) => {
  switch (action.type) {
    case 'CREATE_TOURNAMENT_SUCCESS':
      return action.payload;
    case 'FETCH_TOURNAMENT_SUCCESS':
      return action.payload;
    case 'FETCH_ROUNDS_SUCCESS':
      return {...state, rounds: action.payload};
    case 'UPDATE_PAIRING_RESULT_SUCCESS':
      return {...state, rounds: action.payload};
    case 'DRAW_ROUND_SUCCESS':
      return {...state, rounds: action.payload};
    case 'REDRAW_ROUND_SUCCESS':
      return {...state, rounds: action.payload};
    case 'DELETE_PLAYER_SUCCESS':
      return action.payload;
    case 'UPDATE_PLAYER_SUCCESS':
      return action.payload;
    case 'REGISTER_PLAYER_SUCCESS':
      return action.payload;
    case 'FETCH_PLAYERS_SUCCESS':
      return {...state, players: action.payload};
    default:
      return state;
  }
};
