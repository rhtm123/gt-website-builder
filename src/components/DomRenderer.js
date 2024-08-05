import React from 'react';
import { useDomContext } from '@/context/DomContext';
import { useElementStyleContext } from '@/context/ElementStyleContext';

const renderElement = (element) => {
  const { type, attributes, children, value, id, styles } = element;
  const { domJson, dispatch } = useDomContext();
  const { elementState, setElementState } = useElementStyleContext();

  // Handle click events to update style
  const handleElementClick = (event, elementId) => {
    event.stopPropagation();
    
    // Deep clone the existing DOM JSON
    const updatedDomJson = JSON.parse(JSON.stringify(domJson));

    // Function to find and update the clicked element's style in the context
    const findElement = (element) => {
      if (element.id === elementId) {
        setElementState({ styles: element.styles, elementId: element.id });
      } else if (element.children) {
        element.children.forEach(findElement);
      }
    };

    findElement(updatedDomJson);
  };

  // Handle text change event for editable text nodes
  const handleTextChange = (e, targetId) => {
    const newTextValue = e.target.textContent;
    dispatch({
      type: 'UPDATE_TEXT_NODE',
      payload: { id: targetId, value: newTextValue },
    });
  };

  // Combine styles into a single className string
  const className = Object.values(styles || {}).join(' ');

  // Combine styles and existing className attributes
  const combinedAttributes = {
    ...attributes,
    className: [attributes?.className, className].filter(Boolean).join(' '),
    onClick: (e) => handleElementClick(e, id),
  };

  // Special handling for text type to allow editing
  if (type === 'text') {
    return (
      <span
        key={id}
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => handleTextChange(e, id)}
      >
        {value}
      </span>
    );
  }

  // Recursively render children elements
  const childrenElements = children?.map(renderElement);

  return React.createElement(type, { key: id, ...combinedAttributes }, childrenElements);
};

const DomRenderer = () => {
  const { domJson } = useDomContext();
  return <>{renderElement(domJson)}</>;
};

export default DomRenderer;
