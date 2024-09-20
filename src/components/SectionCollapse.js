import React, { useState } from 'react';
import PreviewRenderer from '@/components/PreviewRenderer';

function SectionCollapse({data, id, insertElement}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center mb-4 justify-center rounded-lg bg-gray-100">
      <div className="w-full bg-base-100 border border-base-300 rounded-lg">
        <div 
          className="flex justify-between px-4 py-2 border-b border-base-300 items-center cursor-pointer" 
          onClick={toggleCollapse}
        >
          <div >
          <p className='font-bold uppercase'>{id+1}. {data.name}</p>
            <span className='opacity-90'>Creator: {data.creator.first_name} {data.creator.last_name}</span>

          </div>

          <div>
          <button onClick={() => insertElement(id)} className='btn btn-sm mr-2 '>Use section</button>

          <span className="btn btn-sm transition-transform duration-300">
            {isOpen ? 'Hide Preview' : 'Show Preview'}
          </span>
          </div>
        </div>
        <div
          className={`transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'}`}
        >
          {isOpen && <PreviewRenderer domJson={JSON.parse(data?.jsondom)} />}
        </div>
      </div>
    </div>
  );
}

export default SectionCollapse;

