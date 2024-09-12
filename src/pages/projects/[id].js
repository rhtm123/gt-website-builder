// pages/index.js
import React from 'react';
import DomRenderer from '@/components/DomRenderer';
import { useDomContext } from '@/context/DomContext';
import StyleHandler from '@/components/StyleHandler';
import { useRef } from 'react';
import { myFetch } from '@/utils/myFetch';
import { useSession, signIn, signOut } from "next-auth/react";
import LoginRequired from '@/components/LoginRequired';
import Link from 'next/link';

import AlertContainer from '@/components/AlertContainer';
import PreviewRenderer from '@/components/PreviewRenderer';
import GenerateHtmlButton from '@/components/GenerateHtmlButton';

// import Head from 'next/head';


const InsertButtonComponent = () => {
  const { domJson, dispatch } = useDomContext();
  const idCounter = useRef(0);

  const [jsonDoms, setJsonDoms] = React.useState([]);

  const [selectedId, setSelectedId] = React.useState();
  const [previewjson, setPreviewjson] = React.useState();

  const getJsonDoms = async () => {
    try {
      let url = process.env.API_URL + "api/builder/builders?page=1&page_size=10";
      let data = await myFetch(url);
      // console.log(data);
      setJsonDoms(data.results);
    } catch (e) {
      console.log("Failed to fetch");
    }
  };

  React.useEffect(() => {
    getJsonDoms();
  }, []);

  const generateUniqueId = () => {
    idCounter.current += 1;
    return `${Date.now()}-${idCounter.current}`;
  };

  const assignIdsRecursively = (element) => {
    element.id = generateUniqueId(); // Assign a unique ID
    if (element.children) {
      element.children.forEach(assignIdsRecursively); // Recursively assign IDs to children
    }
  };

  const insertElement = (id) => {
    let jsondom = jsonDoms[id].jsondom;
    const newElement = JSON.parse(jsondom);
    assignIdsRecursively(newElement);

    dispatch({
      type: 'ADD_ELEMENT_END',
      payload: { newElement },
    });
  };

  const previewBuilder = (id) => {

    // setSelectedJsonDom(null);
    document.getElementById("model1").showModal();


    // setSelectedJsonDom(jsonDoms[id]);
  }

  const [isOpen, setIsOpen] = React.useState(false);

  const toggleModal = (id) => {
    if (!isOpen){
      setPreviewjson(null);
      console.log(id);
      setSelectedId(id)
      let jsondom = jsonDoms[id]?.jsondom;
      const newElement = JSON.parse(jsondom);
      setPreviewjson(newElement);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      {jsonDoms.map((dom, id) => (
        <div key={id} className='bg-base-200 mb-4 rounded-lg p-2 w-full'>
          <p className='font-bold uppercase'>{dom.name}</p>
          <span className='opacity-90'>Creator: {dom.creator.username}</span>
          <div className='flex justify-between py-1'>
            <button className='btn btn-sm btn-outline' 
            onClick={()=>toggleModal(id)}>
  
              Preview</button>

            <button onClick={() => insertElement(id)} className='btn btn-sm btn-primary'>use</button>
          </div>
        </div>
      ))}

{/* 
      <button onClick={} className="btn btn-sm btn-primary">
        Open Modal
      </button> */}

      
      {isOpen && (
        <div className="fixed z-50 m-0 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative max-h-screen overflow-auto bg-base-300 w-full max-w-none mx-4 md:mx-8 lg:mx-16 xl:mx-32 rounded-lg p-8">
            {/* Close button */}
            <button 
              onClick={toggleModal} 
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {previewjson && <PreviewRenderer domJson={previewjson} /> }

          </div>
        </div>
      )}

      
    </div>
  );
};

// const jsonToHtml = (element) => {
//   const { type, attributes, children, value, styles } = element;

//   if (type === 'text') {
//     return value; // Directly return text node value
//   }

//   const styleClassName = Object.values(styles || {}).join(' ');

//   const combinedClassName = [attributes?.className, styleClassName]
//     .filter(Boolean)
//     .join(' ');

//   const attributesString = Object.entries({ ...attributes, className: combinedClassName })
//     .filter(([key, val]) => val)
//     .map(([key, val]) => `${key}="${val}"`)
//     .join(' ');

//   const childrenHtml = (children || []).map(jsonToHtml).join('');

//   return `<${type} ${attributesString}>${childrenHtml}</${type}>`;
// };

// const GenerateHtmlButton = () => {
//   const { domJson } = useDomContext();

//   const generateHtml = () => {
//     const htmlString = jsonToHtml(domJson);
//     console.log(htmlString);
//     console.log(domJson);
//   };

//   return <button className="btn btn-sm btn-secondary" onClick={generateHtml}>Generate HTML</button>;
// };

const Project = ({ data, error }) => {
  const { data: session } = useSession();
  const [project, setProject] = React.useState(data);
  const { domJson, dispatch } = useDomContext();

  const [trueCreator, setTrueCreator] = React.useState(true);

  const alertContainerRef = React.useRef();

  const [isCssLoaded, setIsCssLoaded] = React.useState(false);

  React.useEffect(() => {
    const link = document.createElement('link');
    link.href = "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";
    link.rel = "stylesheet";
    link.onload = () => {
      setIsCssLoaded(true);
    };
    link.async = true;
    document.head.appendChild(link);
  }, []);


  // for daisyUI
  React.useEffect(() => {
    const link = document.createElement('link');
    link.href = "https://cdn.jsdelivr.net/npm/daisyui@4.12.10/dist/full.min.css";
    link.rel = "stylesheet";
    link.onload = () => {
      setIsCssLoaded(true);
    };
    link.async = true;
    document.head.appendChild(link);
  }, []);




  React.useEffect(()=>{
    if (session){
      setTrueCreator(session.user.id == project?.creator.id)
    }
  }, [session])

  React.useEffect(() => {
    const newState = JSON.parse(data.jsondom);
    dispatch({ type: "SET_INITIAL_STATE", payload: { newState } });
  }, []);

  const saveNow = async () => {
    let url = process.env.API_URL + `api/builder/projects/${project.id}/`;
    try{
    let data = await myFetch(url, "PUT", {
      jsondom: JSON.stringify(domJson)
    });
    alertContainerRef.current.addAlert('Project is saved successfully', 'success');

    console.log("saved", data);
    } catch (e) {} 
  };

  if (!trueCreator){
    return (
      <div className='p-8 md:w-1/2 m-auto'>

        <p>You are not the creator of this project. You may not edit this project.</p>

        <Link href="/projects">
            <button className="btn btn-outline mt-4 md:mr-2">All Projects</button>
        </Link>

      </div>
    )
  }

  return (
    <LoginRequired>

      <AlertContainer ref={alertContainerRef} />

      <div className='grid  md:grid-cols-6 divide-x divide-gray-300'>
        <div className='col-span-1 max-h-screen overflow-auto'>
          <div className='p-2'>
            <h3 className="font-bold text-lg">Builders</h3>
          </div>

          <div className='p-2'>
            <InsertButtonComponent />
          </div>
        </div>

        <div className='col-span-4 max-h-screen overflow-auto'>
          


          {(!isCssLoaded) && <p className="text-center p-4 text-error">Loading CSS...</p>}

          
          {(project && isCssLoaded) && <div >
          
          <div className='sticky top-0 z-10	bg-base-300 p-2 border-b'>
          <Link href="/projects">
            <button className="btn btn-sm btn-outline md:mr-2">All Projects</button>
          </Link>

          <button className="btn btn-sm btn-primary md:mr-2" onClick={saveNow}>Save Now</button>
          
          <GenerateHtmlButton />
          </div>


          <div className='p-4'>

            <DomRenderer />

          </div>
          
          </div>
          
          }
        </div>
        <div className='col-span-1 max-h-screen overflow-auto'>
          <div className='p-2'>
          <h3 className="font-bold text-lg">Styles</h3>
          </div>
          <StyleHandler />
        </div>
      </div>
    </LoginRequired>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const url = process.env.API_URL + "api/builder/projects/" + id;

  const res = await fetch(url);
  const error = res.ok ? false : true;
  const data = await res.json();

  return {
    props: {
      data: data,
      error: error,
    },
  };
}

export default Project;
