import {createPropType} from 'react-custom-proptypes';

export const validate = (obj) => {
  if (typeof obj._id !== 'string') {
    return false;
  }
  if (typeof obj.firstname !== 'string') {
    return false;
  }
  if (typeof obj.lastname !== 'string') {
    return false;
  }
  if (typeof obj.rank !== 'string') {
    return false;
  }
  if (obj.score && typeof obj.score !== 'number') {
    return false;
  }
  return true;
};

export const propType = createPropType((prop) => {
  return validate(prop);
});

export const getPlayerById = (id, players) => {
  if (!id || !players) {
    return null;
  }
  return players.find((player) => {
    return player._id === id;
  });
};
