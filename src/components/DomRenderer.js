import React from 'react';
import { useDomContext } from '@/context/DomContext';
import { useElementStyleContext } from '@/context/ElementStyleContext';

const DomRenderer = () => {
  const { domJson, dispatch } = useDomContext();
  const { elementState, setElementState } = useElementStyleContext();

  const handleElementClick = (event, elementId) => {
    event.stopPropagation();
    const updatedDomJson = JSON.parse(JSON.stringify(domJson));

    const findElement = (element) => {
      if (element.id === elementId) {
        setElementState({ styles: element.styles, elementId: element.id });
      } else if (element.children) {
        element.children.forEach(findElement);
      }
    };

    findElement(updatedDomJson);
  };

  const handleTextChange = (e, targetId) => {
    const newTextValue = e.target.textContent;
    dispatch({
      type: 'UPDATE_TEXT_NODE',
      payload: { id: targetId, value: newTextValue },
    });
  };

  const renderElement = (element) => {
    const { type, attributes, children, value, id, styles } = element;

    const className = Object.values(styles || {}).join(' ');

    const combinedAttributes = {
      ...attributes,
      className: [attributes?.class, className].filter(Boolean).join(' '),
      onClick: (e) => handleElementClick(e, id),
    };

    if (type === 'text') {
      return value;  // Directly return the text value without wrapping it in any element
    }

    if (type === 'img') {
      return React.createElement(type, { key: id, ...attributes });
    }

    const childrenElements = children?.map(renderElement);

    return React.createElement(type, { key: id, ...combinedAttributes }, childrenElements);
  };

  return <>{renderElement(domJson)}</>;
};

export default DomRenderer;
