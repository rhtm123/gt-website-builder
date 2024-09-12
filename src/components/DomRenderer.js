import React, { useState } from 'react';
import { useDomContext } from '@/context/DomContext';
import { useElementStyleContext } from '@/context/ElementStyleContext';

const DomRenderer = () => {
  const { domJson, dispatch } = useDomContext();
  const { elementState, setElementState } = useElementStyleContext();
  const [ hoveredElementId, setHoveredElementId ] = useState(null);

  const handleElementClick = (event, elementId, parentElement = null) => {
    event.stopPropagation();
    const updatedDomJson = JSON.parse(JSON.stringify(domJson));

    const findElement = (element, parent = null) => {
      if (element.id === elementId) {
        if (element.type !== 'text') {
          setElementState({ styles: element.styles, elementId: element.id });
        } else if (parent) {
          setElementState({ styles: parent.styles, elementId: parent.id });
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

  const renderElement = (element, parentElement = null) => {
    const { type, attributes, children, value, id, styles } = element;

    const isSelected = elementState?.elementId === id;
    const isHovered = hoveredElementId === id;

    const borderClass = isSelected
      ? 'border border-blue-500'
      : isHovered
      ? 'border border-blue-300'
      : '';

    const className = [Object.values(styles || {}).join(' '), borderClass].filter(Boolean).join(' ');

    const combinedAttributes = {
      ...attributes,
      className: [attributes?.class, className].filter(Boolean).join(' '),
      onClick: (e) => handleElementClick(e, id, parentElement),
      onMouseEnter: () => setHoveredElementId(id),
      onMouseLeave: () => setHoveredElementId(null),
    };

    if (type === 'text') {
      return (
        <span
          key={id}
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleTextChange(e, id)}
          {...combinedAttributes}
        >
          {value}
        </span>
      );
    }

    if (type === 'img') {
      return React.createElement(type, { key: id, ...combinedAttributes });
    }

    const childrenElements = children?.map((child) => renderElement(child, element));

    return React.createElement(type, { key: id, ...combinedAttributes }, childrenElements);
  };

  return <>{renderElement(domJson)}</>;
};

export default DomRenderer;
