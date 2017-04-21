import {createPropType} from 'react-custom-proptypes';

export const validate = (obj) => {
  if (typeof obj._id !== 'string') {
    return false;
  }
  if (typeof obj.name !== 'string') {
    return false;
  }
  if (typeof obj.rank !== 'number') {
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
