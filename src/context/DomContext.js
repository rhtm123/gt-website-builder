import React, { createContext, useContext, useReducer } from 'react';

const MAX_HISTORY_LENGTH = 20;


// Action types
const ADD_ELEMENT_END = 'ADD_ELEMENT_END';
const ADD_ELEMENT_AFTER = 'ADD_ELEMENT_AFTER';
const CHANGE_ELEMENT_STYLE = 'CHANGE_ELEMENT_STYLE';
const UPDATE_TEXT_NODE = 'UPDATE_TEXT_NODE';
const DELETE_ELEMENT = 'DELETE_ELEMENT';
const CHANGE_ELEMENT_ATTRIBUTE = 'CHANGE_ELEMENT_ATTRIBUTE';
const SET_INITIAL_STATE = 'SET_INITIAL_STATE';
const UNDO = 'UNDO';
const REDO = 'REDO';
const MOVE_ELEMENT_UP = 'MOVE_ELEMENT_UP';
const MOVE_ELEMENT_DOWN = 'MOVE_ELEMENT_DOWN';

// Initial state
const initialState = {
  current: {
    type: 'div',
    id: '1',
    attributes: { class: '' },
    styles: {},
    children: [],
  },
  history: [],
  future: [],
};

// Reducer function for managing DOM state
const domReducer = (state, action) => {
  switch (action.type) {
    case ADD_ELEMENT_END:
      return applyAction(state, action, addElementAtEnd);

    case ADD_ELEMENT_AFTER:
      return applyAction(state, action, addElementAfterId);

    case CHANGE_ELEMENT_STYLE:
      return applyAction(state, action, changeElementStyle);

    case UPDATE_TEXT_NODE:
      return applyAction(state, action, updateTextNode);

    case DELETE_ELEMENT:
      // Save current state to history, but do not include the post-delete state
      const newStateAfterDelete = deleteElement(state.current, action.payload);
      return {
        ...state,
        history: [...state.history, state.current],
        current: newStateAfterDelete,
        future: [],
      };

    case CHANGE_ELEMENT_ATTRIBUTE:
      return applyAction(state, action, changeElementAttribute);

    case MOVE_ELEMENT_UP:
      return applyAction(state, action, moveElement, 'UP');

    case MOVE_ELEMENT_DOWN:
      return applyAction(state, action, moveElement, 'DOWN');

    case SET_INITIAL_STATE:
      return { ...state, current: action.payload.newState, history: [], future: [] };

    case UNDO:
      if (state.history.length === 0) return state;
      const previous = state.history[state.history.length - 1];
      const newHistory = state.history.slice(0, -1);
      return {
        ...state,
        current: previous,
        history: newHistory,
        future: [state.current, ...state.future],
      };

    case REDO:
      if (state.future.length === 0) return state;
      const next = state.future[0];
      const newFuture = state.future.slice(1);
      return {
        ...state,
        current: next,
        history: [...state.history, state.current],
        future: newFuture,
      };

    default:
      return state;
  }
};

// Helper function to apply an action and update the history with a max limit

const applyAction = (state, action, handler, ...args) => {

// Ensure that the updatedCurrent is correctly set and that the history is managed properly
const updatedCurrent = handler(state.current, action.payload, ...args);
console.log("APPLY FUNCTION CALLED");

const actions = [DELETE_ELEMENT, ADD_ELEMENT_END, ADD_ELEMENT_AFTER, MOVE_ELEMENT_DOWN, MOVE_ELEMENT_UP];
if (actions.includes(action.type)) {
  let newHistory = [...state.history, state.current];
  console.log("HISTORY LENGTH", newHistory.length);
  
  if (newHistory.length > MAX_HISTORY_LENGTH) {
    newHistory = newHistory.slice(1); // Remove the oldest history item
  }

  return {
    ...state,
    history: newHistory,
    future: [], // Clear the future after any new action
    current: updatedCurrent,
  };
}

return {
  ...state,
  history: [...state.history],
  future: [],
  current: updatedCurrent,
};

};

// Specific helper functions for modifying the state
const addElementAtEnd = (currentState, { newElement }) => {
  const newState = { ...currentState, children: [...currentState.children, newElement] };
  return newState;
};

const addElementAfterId = (currentState, { id, newElement }) => {
  const newState = JSON.parse(JSON.stringify(currentState));

  const findAndInsert = (children) => {
    for (let i = 0; i < children.length; i++) {
      if (children[i].id === id) {
        children.splice(i + 1, 0, newElement);
        return true;
      }
      if (children[i].children) {
        if (findAndInsert(children[i].children)) {
          return true;
        }
      }
    }
    return false;
  };

  findAndInsert(newState.children);
  return newState;
};

const changeElementStyle = (currentState, { id, styles }) => {
  const newState = JSON.parse(JSON.stringify(currentState));

  const findAndUpdateStyle = (children) => {
    for (let i = 0; i < children.length; i++) {
      if (children[i].id === id) {
        children[i].styles = { ...children[i].styles, ...styles };
        return true;
      }
      if (children[i].children) {
        if (findAndUpdateStyle(children[i].children)) {
          return true;
        }
      }
    }
    return false;
  };

  findAndUpdateStyle(newState.children);
  return newState;
};

const updateTextNode = (currentState, { id, value }) => {
  const newState = JSON.parse(JSON.stringify(currentState));

  const findAndUpdateText = (children) => {
    for (let i = 0; i < children.length; i++) {
      if (children[i].type === 'text' && children[i].id === id) {
        children[i].value = value;
        return true;
      }
      if (children[i].children) {
        if (findAndUpdateText(children[i].children)) {
          return true;
        }
      }
    }
    return false;
  };

  findAndUpdateText(newState.children);
  return newState;
};

const deleteElement = (currentState, { id }) => {
  const newState = JSON.parse(JSON.stringify(currentState));

  const findAndDelete = (children) => {
    if (!Array.isArray(children)) return false; // Ensure children is an array

    for (let i = 0; i < children.length; i++) {
      if (!children[i]) continue; // Skip undefined/null elements

      if (children[i].id === id) {
        children.splice(i, 1);
        return true;
      }

      if (Array.isArray(children[i].children)) {
        if (findAndDelete(children[i].children)) {
          return true;
        }
      }
    }
    return false;
  };

  findAndDelete(newState.children);
  return newState;
};

const changeElementAttribute = (currentState, { id, attributes }) => {
  const newState = JSON.parse(JSON.stringify(currentState));

  const findAndUpdateAttribute = (children) => {
    for (let i = 0; i < children.length; i++) {
      if (children[i].id === id) {
        children[i].attributes = { ...children[i].attributes, ...attributes };
        return true;
      }
      if (children[i].children) {
        if (findAndUpdateAttribute(children[i].children)) {
          return true;
        }
      }
    }
    return false;
  };

  findAndUpdateAttribute(newState.children);
  return newState;
};

const moveElement = (currentState, { id }, direction) => {
  const newState = JSON.parse(JSON.stringify(currentState));

  const findAndMove = (children) => {
    for (let i = 0; i < children.length; i++) {
      if (children[i].id === id) {
        if (direction === 'UP' && i > 0) {
          [children[i - 1], children[i]] = [children[i], children[i - 1]];
        } else if (direction === 'DOWN' && i < children.length - 1) {
          [children[i], children[i + 1]] = [children[i + 1], children[i]];
        }
        return true;
      }
      if (children[i].children) {
        if (findAndMove(children[i].children)) {
          return true;
        }
      }
    }
    return false;
  };

  findAndMove(newState.children);
  return newState;
};

// Context and provider for DOM state
const DomContext = createContext();

export const DomProvider = ({ children }) => {
  const [state, dispatch] = useReducer(domReducer, initialState);

  return (
    <DomContext.Provider value={{ domJson: state.current, dispatch }}>
      {children}
    </DomContext.Provider>
  );
};

// Custom hook to use the DomContext
export const useDomContext = () => {
  return useContext(DomContext);
};
