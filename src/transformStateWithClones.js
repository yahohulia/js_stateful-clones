'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const values = [];
  let currentState = { ...state };

  for (const action of actions) {
    let newState;

    switch (action.type) {
      case 'addProperties':
        newState = { ...currentState, ...action.extraData };
        values.push(newState);
        break;

      case 'removeProperties':
        newState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        values.push(newState);
        break;

      case 'clear':
        newState = { ...currentState };

        for (const key in currentState) {
          delete newState[key];
        }
        values.push(newState);
        break;
    }
    currentState = newState;
  }

  return values;
}

module.exports = transformStateWithClones;
