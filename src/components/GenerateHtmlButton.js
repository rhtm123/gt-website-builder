import React, { useState } from 'react';
import { useDomContext } from '@/context/DomContext';
import GenerateHtml from './GenerateHtml';

const GenerateHtmlButton = ({ format = 'jsx' }) => {
  const { domJson } = useDomContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [htmlString, setHtmlString] = useState('');

  const jsonToHtml = (element, indentLevel = 0) => {
    const { type, attributes, children, value, styles } = element;

    const indent = '  '.repeat(indentLevel); // Adjust indentation level

    if (type === 'text') {
      return `${indent}${value}`;
    }

    let styleClassName = Object.values(styles || {}).join(' ');

    if (attributes?.class) {
      styleClassName += ` ${attributes.class}`;
      // delete attributes.class;
    }

    // Combine classes and styles properly
    const combinedClassName = [attributes?.className, styleClassName].filter(Boolean).join(' ');

    let attributesString = '';
    
    if (format === 'jsx') {
      attributesString = Object.entries({ ...attributes, className: combinedClassName })
        .filter(([key, val]) => val)
        .map(([key, val]) => {
          if (key==="class"){
            return ""
          }
          if (key === 'className') {
            return `className="${val}"`; // JSX requires className
          }
          return `${key}="${val}"`;
        })
        .join(' ');
    } else {
      attributesString = Object.entries({ ...attributes, class: combinedClassName })
        .filter(([key, val]) => val)
        .map(([key, val]) => `${key}="${val}"`)
        .join(' ');
    }

    // Handle self-closing tags like img
    const selfClosingTags = ['img', 'input', 'br', 'hr', 'meta', 'link'];

    if (selfClosingTags.includes(type)) {
      return `${indent}<${type} ${attributesString} />\n`;
    }

    const childrenHtml = (children || [])
      .map(child => jsonToHtml(child, indentLevel + 1))
      .join('');

    return `${indent}<${type} ${attributesString}>\n${childrenHtml}\n${indent}</${type}>\n`;
  };

  const generateHtml = () => {
    const generatedHtml = jsonToHtml(domJson, 0); // Start with no indentation
    setHtmlString(generatedHtml);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {format === 'html' && (
        <button className="btn btn-sm" onClick={generateHtml}>
          Generate HTML
        </button>
      )}
      {format === 'jsx' && (
        <button className="btn btn-sm" onClick={generateHtml}>
          Generate JSX
        </button>
      )}
      {isModalOpen && (
        <GenerateHtml htmlString={htmlString} onClose={closeModal} />
      )}
    </>
  );
};

export default GenerateHtmlButton;
