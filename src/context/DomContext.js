import React, { createContext, useContext, useReducer } from 'react';

const ADD_ELEMENT_END = 'ADD_ELEMENT_END';
const ADD_ELEMENT_AFTER = 'ADD_ELEMENT_AFTER';
const CHANGE_ELEMENT_STYLE = 'CHANGE_ELEMENT_STYLE';
const UPDATE_TEXT_NODE = 'UPDATE_TEXT_NODE';
const SET_INITIAL_STATE = 'SET_INITIAL_STATE';
const DELETE_ELEMENT = 'DELETE_ELEMENT';
const MOVE_ELEMENT_UP = 'MOVE_ELEMENT_UP';
const MOVE_ELEMENT_DOWN = 'MOVE_ELEMENT_DOWN';

const initialState = {
  type: 'div',
  id: '1',
  attributes: { class: '' },
  styles: {},
  children: [],
};

// Reducer function to manage state updates
const domReducer = (state, action) => {
  switch (action.type) {
    case ADD_ELEMENT_END:
      return addElementAtEnd(state, action.payload.newElement);

    case ADD_ELEMENT_AFTER:
      return addElementAfterId(state, action.payload.id, action.payload.newElement);

    case CHANGE_ELEMENT_STYLE:
      return changeElementStyle(state, action.payload.id, action.payload.styles);

    case UPDATE_TEXT_NODE:
      return updateTextNode(state, action.payload.id, action.payload.value);

    case DELETE_ELEMENT:
      return deleteElement(state, action.payload.id);

    case SET_INITIAL_STATE:
      return action.payload.newState;

    case MOVE_ELEMENT_UP:
      return moveElement(state, action.payload.id, 'UP');

    case MOVE_ELEMENT_DOWN:
      return moveElement(state, action.payload.id, 'DOWN');

    default:
      return state;
  }
};

// Helper function to move an element up or down
const moveElement = (state, targetId, direction) => {
  const newState = JSON.parse(JSON.stringify(state));

  const findAndMove = (children) => {
    for (let i = 0; i < children.length; i++) {
      if (children[i].id === targetId) {
        if (direction === 'UP' && i > 0) {
          // Swap with the previous element
          [children[i - 1], children[i]] = [children[i], children[i - 1]];
        } else if (direction === 'DOWN' && i < children.length - 1) {
          // Swap with the next element
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

// Helper function to add an element at the end of the children array
const addElementAtEnd = (state, newElement) => {
  const newState = JSON.parse(JSON.stringify(state));
  newState.children.push(newElement);
  return newState;
};

// Helper function to add an element after a given ID
const addElementAfterId = (state, targetId, newElement) => {
  const newState = JSON.parse(JSON.stringify(state));

  const findAndInsert = (children) => {
    for (let i = 0; i < children.length; i++) {
      if (children[i].id === targetId) {
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

// Helper function to change the style of an element
const changeElementStyle = (state, targetId, newStyles) => {
  const newState = JSON.parse(JSON.stringify(state));

  const findAndUpdateStyle = (children) => {
    for (let i = 0; i < children.length; i++) {
      if (children[i].id === targetId) {
        children[i].styles = { ...children[i].styles, ...newStyles };
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

// Helper function to update text node
const updateTextNode = (state, targetId, newTextValue) => {
  const newState = JSON.parse(JSON.stringify(state));

  const findAndUpdateText = (children) => {
    for (let i = 0; i < children.length; i++) {
      if (children[i].type === 'text' && children[i].id === targetId) {
        children[i].value = newTextValue;
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

// Helper function to delete an element
const deleteElement = (state, targetId) => {
  const newState = JSON.parse(JSON.stringify(state));

  const findAndDelete = (children) => {
    for (let i = 0; i < children.length; i++) {
      if (children[i].id === targetId) {
        children.splice(i, 1);
        return true;
      }
      if (children[i].children) {
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

// Create the context
const DomContext = createContext();

// Create a provider component
export const DomProvider = ({ children }) => {
  const [domJson, dispatch] = useReducer(domReducer, initialState);

  return (
    <DomContext.Provider value={{ domJson, dispatch }}>
      {children}
    </DomContext.Provider>
  );
};

// Custom hook to use the DomContext
export const useDomContext = () => {
  return useContext(DomContext);
};
