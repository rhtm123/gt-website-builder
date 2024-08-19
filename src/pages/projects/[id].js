// pages/index.js
import React from 'react';
import DomRenderer from '@/components/DomRenderer';
import { useDomContext } from '@/context/DomContext';
import StyleHandler from '@/components/StyleHandler';
import { useRef } from 'react';
import { myFetch } from '@/utils/myFetch';
import { useSession, signIn, signOut } from "next-auth/react";
import LoginRequired from '@/components/LoginRequired';
import LazyLoadStyles from '@/components/LazyLoadStyles';
import Link from 'next/link';

import AlertContainer from '@/components/AlertContainer';


const InsertButtonComponent = () => {
  const { domJson, dispatch } = useDomContext();
  const idCounter = useRef(0);

  const [jsonDoms, setJsonDoms] = React.useState([]);

  const getJsonDoms = async () => {
    try {
      let url = process.env.API_URL + "api/builder/builders?page=1&page_size=10";
      let data = await myFetch(url);
      console.log(data);
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

  return (
    <div className="space-y-4">
      {jsonDoms.map((dom, id) => (
        <button key={id} className='btn btn-primary w-full' onClick={() => insertElement(id)}>
          {dom.name}
        </button>
      ))}
    </div>
  );
};

const jsonToHtml = (element) => {
  const { type, attributes, children, value, styles } = element;

  if (type === 'text') {
    return value; // Directly return text node value
  }

  const styleClassName = Object.values(styles || {}).join(' ');

  const combinedClassName = [attributes?.className, styleClassName]
    .filter(Boolean)
    .join(' ');

  const attributesString = Object.entries({ ...attributes, className: combinedClassName })
    .filter(([key, val]) => val)
    .map(([key, val]) => `${key}="${val}"`)
    .join(' ');

  const childrenHtml = (children || []).map(jsonToHtml).join('');

  return `<${type} ${attributesString}>${childrenHtml}</${type}>`;
};

const GenerateHtmlButton = () => {
  const { domJson } = useDomContext();

  const generateHtml = () => {
    const htmlString = jsonToHtml(domJson);
    console.log(htmlString);
  };

  return <button className="btn btn-secondary mt-4" onClick={generateHtml}>Generate HTML</button>;
};

const Project = ({ data, error }) => {
  const { data: session } = useSession();
  const [project, setProject] = React.useState(data);
  const { domJson, dispatch } = useDomContext();

  const [trueCreator, setTrueCreator] = React.useState(true);

  const alertContainerRef = React.useRef();



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

      <div className='grid md:grid-cols-6 gap-4 p-4'>
        <LazyLoadStyles />
        <div className='col-span-1'>
          <InsertButtonComponent />
          
        </div>
        <div className='col-span-4'>
          <Link href="/projects">
            <button className="btn btn-outline mt-4  md:mr-2">All Projects</button>

          </Link>

          <button className="btn btn-primary mt-4 md:mr-2" onClick={saveNow}>Save Now</button>
          <GenerateHtmlButton />


          {/* {session && 
          <div className="mb-4 flex justify-between items-center">
            <span>Signed in as {session.user.email}</span>
            <button className="btn btn-sm btn-warning" onClick={() => signOut()}>Sign out</button>
          </div>
          } */}

          
          {project && <DomRenderer />}
        </div>
        <div className='col-span-1'>
          <h3 className="font-bold text-lg mb-4">Styles</h3>
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
