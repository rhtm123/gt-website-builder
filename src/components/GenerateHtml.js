// components/GenerateHtml.js

import React, { useState } from 'react';

const GenerateHtml = ({ htmlString, onClose }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlString)
      .then(() => setIsCopied(true))
      .catch(err => console.error('Failed to copy text: ', err));
  };

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-h-screen overflow-auto bg-base-100 w-full max-w-4xl mx-4 md:mx-8 lg:mx-16 xl:mx-32 rounded-lg p-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative">
          <textarea
            readOnly
            value={htmlString}
            className="w-full h-96 p-4 border border-gray-300 rounded-lg resize-none"
          />
          <button
            onClick={copyToClipboard}
            className="absolute bottom-4 right-4 btn btn-primary"
          >
            {isCopied ? 'Copied!' : 'Copy to Clipboard'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateHtml;
