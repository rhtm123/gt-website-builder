// components/GenerateHtmlButton.js

import React, { useState } from 'react';
import { useDomContext } from '@/context/DomContext';
import GenerateHtml from './GenerateHtml';

const GenerateHtmlButton = ({format="jsx"}) => {
  const { domJson } = useDomContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [htmlString, setHtmlString] = useState('');

  const jsonToHtml = (element) => {
    const { type, attributes, children, value, styles } = element;

    if (type === 'text') {
      return value;
    }

    const styleClassName = Object.values(styles || {}).join(' ');

    const combinedClassName = [attributes?.className, styleClassName]
      .filter(Boolean)
      .join(' ');

    let attributesString = '';
    if (format === "jsx") {
      attributesString = Object.entries({ ...attributes, className: combinedClassName })
        .filter(([key, val]) => val)
        .map(([key, val]) => `${key}="${val}"`)
        .join(' ');
    } else {
      attributesString = Object.entries({ ...attributes, class: combinedClassName })
        .filter(([key, val]) => val)
        .map(([key, val]) => `${key}="${val}"`)
        .join(' ');
    }

    const childrenHtml = (children || []).map(jsonToHtml).join('');

    return `<${type} ${attributesString}>${childrenHtml}</${type}>`;
  };

  const generateHtml = () => {
    const generatedHtml = jsonToHtml(domJson);
    setHtmlString(generatedHtml);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {format==="html" && <button className="btn btn-sm " onClick={generateHtml}>
        Generate HTML
      </button>}
      {format==="jsx" && <button className="btn btn-sm " onClick={generateHtml}>
        Generate JSX
      </button>}
      {isModalOpen && (
        <GenerateHtml htmlString={htmlString} onClose={closeModal} />
      )}
    </>
  );
};

export default GenerateHtmlButton;
