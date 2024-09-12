import React from 'react';
import { useElementStyleContext } from '@/context/ElementStyleContext';

const PreviewRenderer = ({domJson}) => {
  const { elementState } = useElementStyleContext();

  const renderElement = (element, parentElement = null) => {
    const { type, attributes, children, value, id, styles } = element;

    const isSelected = elementState?.elementId === id;
    const className = Object.values(styles || {}).join(' ');

    const combinedAttributes = {
      ...attributes,
      className: [attributes?.class, className].filter(Boolean).join(' '),
    };

    if (type === 'text') {
      return (
        <span key={id} {...combinedAttributes}>
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

export default PreviewRenderer;

