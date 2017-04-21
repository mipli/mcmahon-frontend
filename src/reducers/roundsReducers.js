export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_ROUNDS_SUCCESS':
      return action.payload;
    case 'UPDATE_PAIRING_RESULT_SUCCESS':
      return action.payload;
    case 'DRAW_ROUND_SUCCESS':
      return action.payload;
    case 'REDRAW_ROUND_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};
