import { myFetch } from '@/utils/myFetch';
import React from 'react';
import Link from 'next/link';

import { useSession, signOut} from "next-auth/react";
import LoginRequired from '@/components/LoginRequired';
import Loading from '@/components/Loading';
import AlertContainer from '@/components/AlertContainer';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';


export default function Projects() {
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [name, setName] = React.useState("");
  const { data: session } = useSession();
  const [next, setNext] = React.useState();
  const [loadingMore, setLoadingMore] = React.useState(false);

  const alertContainerRef = React.useRef();



  const getProjects = async () => {
    setLoading(true);
    try {
      let url = process.env.API_URL + "api/builder/projects?page=1&page_size=10&ordering=-updated&creator_id=" + session?.user?.id;
      let data = await myFetch(url);
      setProjects(data.results);
      setNext(data.next);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (session) {
      // console.log(session);
      getProjects();
    }
  }, [session]);

  const loadMore = () => {
    setLoadingMore(true);
    fetch(next)
      .then(async (response) => {
        if (response.ok) {
          let data1 = await response.json();
          setProjects((oldArray) => [...oldArray, ...data1.results]);
          setNext(data1.next);
        }
        setLoadingMore(false);
      })
      .catch(error => {
        console.log("error happened");
        setLoadingMore(false);
      });
  };

  const addProject = async () => {
    let url = process.env.API_URL + "api/builder/projects/";
    let data = await myFetch(url, "POST", {
      "name": name,
      "creator": session.user.id,
    });
    console.log(data); setName("");
    alertContainerRef.current.addAlert('New Project Added!', 'success');

    document.getElementById('my_modal_2').close();
    getProjects();
  };

  const handleEditProject = async (project_id) => {

    
    // console.log("handle it now");
  }

  const handleDeleteProject = async (project_id) => {
    let url = process.env.API_URL + `api/builder/projects/${project_id}/`;
    try{
      let data = await myFetch(url, "DELETE");
      getProjects();
      alertContainerRef.current.addAlert('Project Deleted!', 'error');

    } catch (e){
    }
  }

  return (
    <>

    <Navbar />
    <LoginRequired>

      <AlertContainer ref={alertContainerRef} />


      <div className='md:w-2/3 min-h-screen  mx-auto py-8 px-4'>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl justify-start font-bold">My Projects</h1>
          <div className='p-0'>
            {/* <Link href={"/convert"}>
              <button className="btn btn-primary">
                Convert
              </button>
            </Link> */}
            <button 
              className="btn btn-primary font-bold"
              onClick={() => document.getElementById('my_modal_2').showModal()}
            >
              Add Project +
            </button>

          </div>
        </div>


        <dialog id="my_modal_2" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg mb-4">Create a New Project</h3>

    <input 
      onChange={(e) => setName(e.target.value)} 
      value={name} 
      type="text" 
      placeholder="Project Name" 
      className="input input-bordered w-full mb-4" 
      required
    />

    <div className="flex justify-end space-x-2">
      <button 
        className="btn btn-secondary" 
        onClick={() => document.getElementById('my_modal_2').close()}
      >
        Cancel
      </button>
      <button 
        className='btn btn-primary' 
        onClick={() => {
          if (name.trim()) {
            addProject();
          } else {
            alert("Project Name is required.");
          }
        }}
      >
        Create
      </button>
    </div>
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>Close</button>
  </form>
</dialog>


        {loading && <Loading />}

        
        {!loading && (
  <div className="space-y-4">
    {projects.map((project, id) => (
      <div 
        key={id} 
        className="p-4 border border-base-300 rounded-lg"
      >
        <div className="flex justify-between items-center">
          <Link href={"/projects/" + project.id} className="text-lg font-semibold text-primary hover:underline">
            {project.name}
          </Link>
          <div className="flex space-x-2">
            {/* <button 
              className="btn btn-sm btn-warning"
              onClick={() => handleEditProject(project.id)}
            >
              Edit
            </button> */}
            <button 
              className="btn btn-sm btn-error"
              onClick={() => handleDeleteProject(project.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ))}

    {loadingMore && <Loading />}
    {next && !loadingMore && !loading && (
      <div className="text-center mt-6">
        <button 
          onClick={loadMore} 
          className='btn btn-secondary'
        >
          Load more
        </button>
      </div>
    )}
  </div>
)}  

      {(!loading && projects.length === 0) && <div className="mt-6">No projects found.</div>}


      </div>
    </LoginRequired>
    <Footer />
    </>
  );
}
