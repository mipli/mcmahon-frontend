function removePlayerFromState(player, state) {
  const idx = state.findIndex((p) => {
    return p._id === player._id;
  });
  if (idx === -1) {
    return state;
  }
  return [...state.slice(0, idx), ...state.slice(idx + 1)];
}

export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PLAYERS_SUCCESS':
      return action.payload;
    case 'REGISTER_PLAYER_SUCCESS':
      return [...state, action.payload];
    case 'UPDATE_PLAYER_SUCCESS':
      const player = action.payload;
      return state.map((p) => {
        return p._id === player._id ? player : p;
      });
    case 'DELETE_PLAYER_SUCCESS':
      return removePlayerFromState(action.payload, state);
    default:
      return state;
  }
};
