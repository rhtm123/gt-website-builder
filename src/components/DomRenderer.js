import React, { useState } from 'react';
import { useDomContext } from '@/context/DomContext';
import { useElementStyleContext } from '@/context/ElementStyleContext';
import { AiOutlineDelete } from "react-icons/ai";
import { FiArrowUpLeft, FiArrowDownRight } from "react-icons/fi";

const DomRenderer = () => {
  const { domJson, dispatch } = useDomContext();
  const { elementState, setElementState } = useElementStyleContext();
  const [hoveredElementId, setHoveredElementId] = useState(null);

  const handleElementClick = (event, elementId, parentElement = null) => {
    event.stopPropagation();
    const updatedDomJson = JSON.parse(JSON.stringify(domJson));

    const findElement = (element, parent = null) => {
      if (element.id === elementId) {
        if (element.type !== 'text') {
          setElementState({ styles: element.styles, attributes:element.attributes, elementId: element.id });
        } else if (parent) {
          setElementState({ styles: parent.styles, attributes:parent.attributes , elementId: parent.id });
        }
      } else if (element.children) {
        element.children.forEach((child) => findElement(child, element));
      }
    };

    findElement(updatedDomJson, parentElement);
  };

  const handleTextChange = (e, targetId) => {
    const newTextValue = e.target.textContent;
    dispatch({
      type: 'UPDATE_TEXT_NODE',
      payload: { id: targetId, value: newTextValue },
    });
  };

  const handleDeleteClick = (event, elementId) => {
    console.log("DELETE CALLED");
    event.stopPropagation();
    setElementState({ styles: {}, elementId: null });
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { id: elementId },
    });
  };

  const handleMoveUp = (event, elementId) => {
    event.stopPropagation();
    dispatch({
      type: 'MOVE_ELEMENT_UP',
      payload: { id: elementId },
    });
  };

  const handleMoveDown = (event, elementId) => {
    event.stopPropagation();
    dispatch({
      type: 'MOVE_ELEMENT_DOWN',
      payload: { id: elementId },
    });
  };

  const handleUndo = () => {
    dispatch({ type: 'UNDO' });
  };

  const handleRedo = () => {
    dispatch({ type: 'REDO' });
  };

  const renderElement = (element, parentElement = null, index = 0, totalChildren = 0) => {
    const { type, attributes, children, value, id, styles } = element;
  
    const isSelected = elementState?.elementId === id;
    const isHovered = hoveredElementId === id;
  
    const borderClass = isSelected
      ? 'border-2 border-blue-500'
      : isHovered
      ? 'border-2 border-blue-300'
      : '';
  
    const className = [Object.values(styles || {}).join(' '), borderClass]
      .filter(Boolean)
      .join(' ');
  
    const combinedAttributes = {
      ...attributes,
      className: [attributes?.class, className].filter(Boolean).join(' '),
      onClick: (e) => handleElementClick(e, id, parentElement),
      onMouseEnter: () => setHoveredElementId(id),
      onMouseLeave: () => setHoveredElementId(null),
    };
  
    const controlButtons = isSelected ? (
      <span
        style={{
          position: 'absolute',
          top: '-10px',
          right: '0',
          zIndex: 4,
          display: 'flex',
          gap: '2px',
        }}
      >
        {index > 0 && (
          <button
            onClick={(e) => handleMoveUp(e, id)}
            className="text-sm bg-primary text-white p-1 rounded"
          >
            <FiArrowUpLeft />
          </button>
        )}
        {index < totalChildren - 1 && (
          <button
            onClick={(e) => handleMoveDown(e, id)}
            className="text-sm bg-primary text-white p-1 rounded"
          >
            <FiArrowDownRight />
          </button>
        )}
        <button
          onClick={(e) => handleDeleteClick(e, id)}
          className="text-sm bg-error text-white p-1 rounded"
        >
          <AiOutlineDelete />
        </button>
      </span>
    ) : null;
  
    if (type === 'text') {
      return (
        <span
          key={id}
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleTextChange(e, id)}
          style={{ position: 'relative' }}
          {...combinedAttributes}
        >
          {value}
          {controlButtons}
        </span>
      );
    }

    if (type === 'img') {
      return (
        <span style={{ position: 'relative' }} key={id}>
          {React.createElement(type, { ...combinedAttributes })}
          {controlButtons}
        </span>
      );
    }

  
    if (type === 'input' || type === 'select' || type === 'textarea') {
      return (
        <span key={id} style={{ position: 'relative' }}>
          <input
            {...combinedAttributes}
            value={attributes.value || value || ''}  // Control the value
            onChange={(e) => dispatch({
              type: 'UPDATE_INPUT_VALUE',
              payload: { id, value: e.target.value },
            })}  // Update state on change
          />
          {controlButtons}
        </span>
      );
    }
  
    const childrenElements = children?.map((child, i) =>
      renderElement(child, element, i, children.length)
    );
  
    return React.createElement(
      type,
      { key: id, style: { position: 'relative' }, ...combinedAttributes },
      childrenElements,
      controlButtons
    );
  };
  



  return (
    <>
      {renderElement(domJson)}
    </>
  );
};

export default DomRenderer;