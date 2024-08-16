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

const InsertButtonComponent = () => {
  const { domJson, dispatch } = useDomContext();
  const idCounter = useRef(0);

  const [jsonDoms, setJsonDoms] = React.useState([]);

  const getJsonDoms = async () =>{
    try {
    let url = process.env.API_URL + "api/builder/builders?page=1&page_size=10"
    let data = await myFetch(url);
    console.log(data);
    setJsonDoms(data.results);
    } catch (e) { 
      console.log("Failed to fetch")
    }
  }

  React.useEffect(()=>{
    getJsonDoms();
  },[])

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
    // console.log(jsondom);
    const newElement = JSON.parse(jsondom);
    // console.log(newElement);
    assignIdsRecursively(newElement);
    // console.log(newElement);

    // const newElement = {
    //   type: 'p',
    //   attributes: { className: 'text-primary' },
    //   styles: { bg: '', btn: "" },
    //   children: [{ type: 'text', value: 'New Element After' }],
    // };

    assignIdsRecursively(newElement);

    // dispatch({
    //   type: 'ADD_ELEMENT_AFTER',
    //   payload: { id: '4', newElement },
    // });

    dispatch({
      type: 'ADD_ELEMENT_END',
      payload: {newElement} ,
    });

  }

  return (
    <>


    {jsonDoms.map((dom, id)=>
      <button key={id} className='btn btn-primary' onClick={() => insertElement(id)}>
        {dom.name}
      </button>
    )}
    </>
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
    const htmlString = jsonToHtml(domJson);
    console.log(htmlString);
  };

  return <button onClick={generateHtml}>Generate HTML</button>;
};








const Project = ({data,error}) => {

  const { data: session } = useSession()
  const [project, setProject] = React.useState(data);
  const [loading, setLoading] = React.useState(true);
  const { domJson, dispatch } = useDomContext();



//   const {id} = router.query;

  React.useEffect(() => {
    // getProject();
    // setProject(data);
    console.log(data);
    const newState = JSON.parse(data.jsondom);
    console.log(newState);
    dispatch({ type: "SET_INITIAL_STATE", payload:  {newState } });

  },[])


  const saveNow = async () => { 
    let url = process.env.API_URL + `api/builder/projects/${project.id}/`
    let res = await myFetch(url, "PUT", {
        jsondom: JSON.stringify(domJson)
    })  
    console.log("saved", data);
  }


  return(

    <LoginRequired>
    <div className='grid md:grid-cols-6 md:gap-4'>

    <LazyLoadStyles />



      <div className='col-span-1'>
        <InsertButtonComponent />
        
      </div>

      <div className='col-span-4'>

      {session && 
      <>
        Signed in as {session.user.email} {session?.user.id} 
        <button onClick={() => signOut()}>Sign out</button>
      </>
      }

      <br />

        <GenerateHtmlButton /> 
        <button onClick={saveNow}>Save Now</button>

        {project && <>
            <DomRenderer />
        </>}

      </div>

      <div className='col-span-1'>
        Styles

        <StyleHandler />

      </div>
      
    </div>
    </LoginRequired>
  );
};

export async function getServerSideProps(context) {
    // Fetch data from external API
    const {id} = context.params;
    const url = process.env.API_URL+"api/builder/projects/"+id;
  
    const res = await fetch(url)
    const error = res.ok ? false : true
    const data = await res.json()
  
    return { 
        props: { 
            data:data, error:error
        } 
  
    }
  }

export default Project;
