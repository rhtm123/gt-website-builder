import React from 'react';
import Link from 'next/link';

const ScreenSizeMessage = () => {
  return (
    <div className="fixed inset-0 bg-base-300 flex items-center justify-center">
      <div className="text-center p-4">
        <h2 className="text-2xl font-bold mb-2">Screen Size Notice</h2>
        <p className="mb-1">This page is not available for smaller screens.</p>
        <p className='mb-2'>Please open on a desktop for the best experience.</p>
        <Link className="btn btn-sm btn-primary" href='/'>Go to Home</Link>
      </div>
    </div>
  );
};

export default ScreenSizeMessage;