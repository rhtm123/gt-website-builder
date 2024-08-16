import { myFetch } from '@/utils/myFetch';
import React from 'react';
import Link from 'next/link';

import { getProviders, useSession, signIn, signOut, getSession } from "next-auth/react";
import LoginRequired from '@/components/LoginRequired';

// import LoginRequired from '@/components/LoginRequired';

export default function Home(){


  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const [name, setName] = React.useState("Project 420");

  const { data: session } = useSession();

  


  const getProjects = async () => {
    setLoading(true);
    try {
      let url = process.env.API_URL + "api/builder/projects?page=1&page_size=10";
      let data = await myFetch(url);
      console.log(data);
      setProjects(data.results);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(()=>{
    getProjects();
  },[])

  const addProject = async ()=> {
    let url = process.env.API_URL + "api/builder/projects/";
    let data = await myFetch(url, "POST" ,{
      "name": name,
      "creator": session.user.id,

    })

    projects.push(data);

    setProjects(projects);

    // console.log(data);

  }


  return(
    <LoginRequired>
    <div className='py-8 md:w-1/2 md:m-auto'>

      <button onClick={addProject}>Add New Project</button>
        {/* jsonDoms.map */}
       { projects.map((project, id)=> 
       <div key={id}>

          <Link href={"/projects/"+project.id}>{project.name}</Link>

       </div>
  
       
       )}
    
    </div>
    </LoginRequired>
  )
}