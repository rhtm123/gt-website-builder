import React, { createContext, useContext, useState } from 'react';
import {  useReducer } from 'react';

const ADD_ELEMENT_END = 'ADD_ELEMENT_END';
const ADD_ELEMENT_AFTER = 'ADD_ELEMENT_AFTER';
const CHANGE_ELEMENT_STYLE = 'CHANGE_ELEMENT_STYLE';
const UPDATE_TEXT_NODE = 'UPDATE_TEXT_NODE';  // New action type



const initialState = {
  type: 'main',
  id: '1',
  attributes: { className: 'container' },
  styles: {
    color: 'text-secondary',
    bg: 'bg-base-100',
  },
  children: [
    {
      type: 'h1',
      id: '2',
      attributes: { className: 'title' },
      styles: {
        color: 'text-primary',
        outline: 'btn-outline',
        bg: 'bg-base-200',
      },
      children: [{ type: 'text', id: '7', value: 'Hello World' }],
    },
    {
      type: 'div',
      id: '4',
      attributes: { className: 'container p-8' },
      styles: {
        color: 'text-secondary',
        outline: 'btn-outline',
        bg: 'bg-base-300',
      },
      children: [
        {
          type: 'p',
          id: '10',
          attributes: { className: 'description' },
          styles: {},
          children: [
            {
              type: 'text',
              id: '11',
              value: 'This is a paragraph inside div',
            },
          ],
        },
      ],
    },
    {
      type: 'p',
      id: '3',
      attributes: { className: 'description' },
      styles: {},
      children: [{ type: 'text', id: '8', value: 'This is a paragraph.' }],
    },
  ],
};

// Reducer function to manage state updates
const domReducer = (state, action) => {
  switch (action.type) {
    case ADD_ELEMENT_END:
      return addElementAtEnd(state, action.payload);

    case ADD_ELEMENT_AFTER:
      return addElementAfterId(state, action.payload.id, action.payload.newElement);

    case CHANGE_ELEMENT_STYLE:
      return changeElementStyle(state, action.payload.id, action.payload.styles);

    case UPDATE_TEXT_NODE:
      return updateTextNode(state, action.payload.id, action.payload.value);
    default:
      return state;
  }
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
