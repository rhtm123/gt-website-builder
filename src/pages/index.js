// pages/index.js
import React from 'react';
import DomRenderer from '@/components/DomRenderer';
import { useDomContext } from '@/context/DomContext';
import StyleHandler from '@/components/StyleHandler';


const InsertButtonComponent = () => {
  const { domJson, dispatch } = useDomContext();

  const insertButtonInDiv = (targetId) => {

    const newElement = {
      type: 'p',
      id: `${new Date().getTime()}`,
      attributes: { className: 'new-element-after' },
      styles: { bg: 'bg-new-after' },
      children: [{ type: 'text', id: 'new-text-after', value: 'New Element After' }],
    };

    dispatch({
      type: 'ADD_ELEMENT_AFTER',
      payload: { id: targetId, newElement },
    });
  
  };

  return (
    <button className='btn btn-primary' onClick={() => insertButtonInDiv('4')}>
      Insert Button in Div
    </button>
  );
};


const jsonToHtml = (element) => {
  const { type, attributes, children, value, styles } = element;

  if (type === 'text') {
    return value; // Directly return text node value
  }

  // Convert styles object to a className string
  const styleClassName = Object.values(styles || {}).join(' ');

  // Merge styles and existing className attributes
  const combinedClassName = [attributes?.className, styleClassName]
    .filter(Boolean)
    .join(' ');

  // Construct opening tag with combined attributes
  const attributesString = Object.entries({ ...attributes, className: combinedClassName })
    .filter(([key, val]) => val) // Ensure no empty attributes
    .map(([key, val]) => `${key}="${val}"`)
    .join(' ');

  // Recursively build children HTML
  const childrenHtml = (children || []).map(jsonToHtml).join('');

  // Return complete element HTML
  return `<${type} ${attributesString}>${childrenHtml}</${type}>`;
};


const GenerateHtmlButton = () => {
  const { domJson } = useDomContext();

  const generateHtml = () => {
    // Generate HTML from the JSON structure
    const htmlString = jsonToHtml(domJson);

    // Display the HTML in a <pre> tag or console
    console.log(htmlString);
    // alert("HTML has been generated. Check the console or download the file.");

    // Optionally download as a file
    // const blob = new Blob([htmlString], { type: 'text/html' });
    // const url = URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = 'output.html';
    // a.click();
    // URL.revokeObjectURL(url);
  };

  return <button onClick={generateHtml}>Generate HTML</button>;
};






const Home = () => {

  return(
    <div className='grid md:grid-cols-6 md:gap-4'>

      <div className='col-span-1'>
        <InsertButtonComponent />
      </div>

      <div className='col-span-4'>
        <GenerateHtmlButton />
        <DomRenderer />

      </div>

      <div className='col-span-1'>
        Styles

        <StyleHandler />

      </div>
      
    </div>
  );
};

export default Home;
