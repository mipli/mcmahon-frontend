export default (state = null, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};
