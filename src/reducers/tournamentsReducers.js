function stripChildValues(tournament) {
  delete tournament.rounds;
  return tournament;
}

export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_TOURNAMENTS_SUCCESS':
      return action.payload.map(stripChildValues);
    case 'CREATE_TOURNAMENTS_SUCCESS':
      return [...state, action.payload];
    default:
      return state;
  }
};
