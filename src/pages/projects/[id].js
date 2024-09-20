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
// import PreviewRenderer from '@/components/PreviewRenderer';
import GenerateHtmlButton from '@/components/GenerateHtmlButton';

import SectionCollapse from '@/components/SectionCollapse';

// import Head from 'next/head';


const GetSections = ({setActiveTab}) => {
  const { domJson, dispatch } = useDomContext();
  const idCounter = useRef(0);

  const [sections, setSections] = React.useState([]);

  // const [selectedId, setSelectedId] = React.useState();
  // const [previewjson, setPreviewjson] = React.useState();

  const getsections = async () => {
    try {
      let url = process.env.API_URL + "api/builder/builders?page=1&page_size=10";
      let data = await myFetch(url);
      // console.log(data);
      setSections(data.results);
      // JSON.parse(sections[id]?.jsondom)
      // console.log( JSON.parse(data.results[0].jsondom));
    } catch (e) {
      console.log("Failed to fetch");
    }
  };

  React.useEffect(() => {
    getsections();
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
    // console.log(id);
    let jsondom = sections[id].jsondom;
    const newElement = JSON.parse(jsondom);
    assignIdsRecursively(newElement);

    setActiveTab("website");

    dispatch({
      type: 'ADD_ELEMENT_END',
      payload: { newElement },
    });
  };


  return (
    <div className="p-4">

      {sections.length === 0 && 
        <span class="py-2 loading loading-dots loading-sm"></span>
      }

      {sections.map((dom, id) => (
        <SectionCollapse key={id} data={dom} insertElement={insertElement} id={id} />
      ))}
      
    </div>
  );
};


const Project = ({ data, error }) => {
  const { data: session } = useSession();
  const [project, setProject] = React.useState(data);
  const { domJson, dispatch } = useDomContext();

  const [trueCreator, setTrueCreator] = React.useState(true);

  const alertContainerRef = React.useRef();

  const [isCssLoaded, setIsCssLoaded] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("website");

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


        <div className='col-span-5 h-screen overflow-auto'>
        
    
            
            {(!isCssLoaded) && <p className="text-center p-4 text-error">Loading CSS...</p>}

            {(project && isCssLoaded) && <div>

              <div className='flex justify-between sticky top-0 z-10	bg-base-300 p-2 border-b'>
              
              <div className='flex gap-2'> 
              <button onClick={()=>setActiveTab("website")} className={activeTab == "website" ? 'btn btn-sm btn-outline text-success' : 'btn btn-sm'}>Website Preview</button>
              <button onClick={()=>setActiveTab("builder")} className={activeTab == "builder" ? 'btn btn-sm btn-outline text-success' : 'btn btn-sm'}>Explore Sections</button>
              </div>
              <div>
              <Link href="/projects">
                <button className="btn btn-sm  md:mr-2">All Projects</button>
              </Link>

              <span className='mr-2'>
              <GenerateHtmlButton format="html" />
              </span>

              <span className='mr-2'>
              <GenerateHtmlButton format="jsx" />
              </span>

              <button className="btn btn-sm btn-success" onClick={saveNow}>Save Now</button>

            </div>
            </div>


            {activeTab == "builder" && <div>
              <div className=''>
                <GetSections setActiveTab={setActiveTab} />
              </div>
            </div>}

            {activeTab == "website" && 
            
            <div className='p-0 z-0 bg-base-100'>

              <DomRenderer />

            <div className='flex justify-center opacity-10 hover:opacity-90'>
              <button className='btn btn-sm btn-outline my-4' onClick={()=>setActiveTab("builder")}>Add New Section</button>
            </div>
            </div>}
            
            </div>
            
            }
        </div>
        <div className='col-span-1 h-screen overflow-auto'>
          <div className='p-2 bg-base-300 border-b'>
            <div className='p-1 font-semibold bg-base-300'>Selected Styles</div>
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
