import { useEffect } from 'react';

const Footer = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://thelearningsetu.com/static/js/gt.js?t=1'; // Replace with your script path
    script.async = true; // Optional: Load script asynchronously (recommended)
    
    document.body.appendChild(script);

    // Clean up the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <footer className="footer bg-base-200 text-base-content md:p-8 p-8">
        <aside>
          <div className='flex items-center'>
          <img src="/img/logo.png" alt="Logo" className="h-8 w-8 mr-2 fill-base-100" />

            <span className="font-bold text-2xl">CraftMySite</span>
            
          </div>
          <p className=''>Website Builder for Tailwind Developers</p>

          <div className="grid grid-flow-col gap-4">

            <a className='btn btn-sm' target='_blank' href="https://twitter.com/CodingChaska">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a className='btn btn-sm' target='_blank' href="https://www.youtube.com/@CodingChaska">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
            <a className='btn btn-sm' target='_blank' href="https://www.instagram.com/codingchaskaofficial/">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
          </div>
        </aside>

        <nav>
          <h6 className="footer-title">Services</h6>
          <a href="/projects" className="link link-hover">My Projects</a>
          {/* <a href="/add-problem" className="link link-hover">Add Coding Problem</a> */}
        </nav>

        <nav>
          <h6 className="footer-title">Other Products</h6>
          <a href="https://www.codingchaskalab.com/" target="_blank" className="link link-hover">Online Code Editor</a>
          <a href="https://www.codingchaska.com/" target="_blank" className="link link-hover">Learn Coding</a>
        </nav>



        <nav>
          <h6 className="footer-title">Important Links</h6>
          {/* <a href="/about" className="link link-hover">About us</a> */}
          <a href="/versions" className="link link-hover">App History</a>
        </nav>
      </footer>

      <p className="text-center bg-base-300 p-2">Copyright © 2024 - All right reserved by Learning Setu Private Limited | <span id="gt"></span></p>
    </>
  );
};

export default Footer;
