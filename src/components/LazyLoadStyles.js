// components/LazyLoadStyles.js
import dynamic from 'next/dynamic';

const LazyLoadStyles = dynamic(() => import('./TailwindAndDaisyUIStyles'), {
  ssr: false,
});

export default LazyLoadStyles;
